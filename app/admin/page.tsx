"use client";

import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const page = () => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = e.currentTarget.value;
    const name = e.currentTarget.name;
    setData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (!file) return;

    setData((prev: any) => ({
      ...prev,
      image: file,
    }));
  };

  const validateData = () => {
    if (
      !data.title ||
      !data.slug ||
      !data.image ||
      !data.slug ||
      !data.prompt
    ) {
      return false;
    }
    return true;
  };

  const handleButtonClick = async () => {
    if (!validateData()) {
      setError("One of the field is empty");
      return;
    }

    try {
      const isSuccess = await uploadImageToStorage();
      if (isSuccess === false) return;

      await insertDataToDB();
      setError("");
    } catch (e) {}
  };

  const insertDataToDB = async () => {
    const fileName = data.slug;
    const {
      data: { publicUrl },
    } = supabaseClient.storage.from("prompt_images").getPublicUrl(fileName);

    const { error: insertError } = await supabaseClient.from("prompt").insert([
      {
        title: data.title,
        keyword: data.keywords,
        slug: data.slug,
        prompt: data.prompt,
        image_url: publicUrl,
        is_trending: false,
      },
    ]);

    if (error) return;

    setData({});
  };

  const uploadImageToStorage = async () => {
    const file = data.image;
    const fileName = data.slug;

    const { data: uploadData, error: uploadError } =
      await supabaseClient.storage
        .from("prompt_images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

    if (uploadError) {
      setError(uploadError.message);
      return false;
    }

    return true;
  };

  return (
    <div className="w-full flex mt-[8rem] justify-center items-center text-black">
      <form className="w-1/4 py-5 px-3 border border-gray-900 flex flex-col">
        <input
          onChange={handleChange}
          className="my-2 border border-gray-500 px-2 py-1"
          type="text"
          placeholder="Enter title"
          name="title"
          value={data.title ?? ""}
        />
        <input
          onChange={handleChange}
          className="my-2 border border-gray-500 px-2 py-1"
          type="text"
          placeholder="Enter keywords"
          name="keywords"
          value={data.keywords ?? ""}
        />
        <input
          onChange={handleChange}
          className="my-2 border border-gray-500 px-2 py-1"
          type="text"
          placeholder="Enter slug"
          name="slug"
          value={data.slug ?? ""}
        />
        <textarea
          className="my-2 border border-gray-500 px-2 py-1"
          rows={6}
          onChange={handleChange}
          cols={10}
          placeholder="Enter prompt"
          name="prompt"
          value={data.prompt ?? ""}
        ></textarea>

        <input
          className="bg-gray-200 w-fit px-2 py-2 mt-3"
          type="file"
          id="image-upload"
          name="image"
          accept="image/*"
          placeholder="Choose Image"
          onChange={handleImageUpload}
        />

        {error.length > 0 && <span className="mt-3 text-red-500">{error}</span>}

        <button
          type="button"
          onClick={handleButtonClick}
          className="px-2 py-1 bg-blue-400 rounded-md w-fit mt-5"
        >
          Add To DB
        </button>
      </form>
    </div>
  );
};

export default page;

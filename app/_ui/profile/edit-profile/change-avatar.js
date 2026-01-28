import Image from "next/image";

export default function ChangeAvatar({ profileImage, handleFileChange }) {
  const imageSrc = profileImage || "/default-avatar.png"; // عکس پیش‌فرض در صورت نبودن عکس

  return (
    <div className="col-span-full">
      <label htmlFor="avatar" className="block text-sm/6 font-medium">
        Avatar
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <div className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-gray-400/25 border border-gray-400/25">
          <Image
            src={imageSrc}
            alt="Profile Picture"
            fill
            className="object-cover object-center"
            unoptimized
            sizes="80px"
          />
        </div>
        <label
          htmlFor="avatar"
          className="relative cursor-pointer rounded-xl bg-background focus-within:outline-none"
        >
          <span className='rounded-xl bg-background px-3 py-1 text-xs ring-1 ring-inset ring-gray-400/25 lg:hover:bg-gray-400/25 active:bg-gray-400/25'>Change</span>
          <input
            id="avatar"
            name="avatar"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            accept="image/*"
          />
        </label>
      </div>
    </div>
  )
}
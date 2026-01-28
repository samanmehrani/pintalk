'use client'

import { useEffect, useState } from 'react'

import { PencilSquareIcon } from '@heroicons/react/24/outline'

import Header from '@/app/_ui/header'
import Input from '@/app/_ui/form/input'

import ChangeUsername from '@/app/_ui/profile/edit-profile/change-username'
import ChangeAvatar from '@/app/_ui/profile/edit-profile/change-avatar'

import { useUserStore } from '@/app/_lib/hooks/store'
import { UpdateUserInfo } from '@/app/_lib/api/user'
import { storeUser } from '@/app/_lib/user'

export default function EditProfile() {
  const user = useUserStore((state) => state.user)

  let formData = new FormData()

  const [newUsername, setNewUsername] = useState('')
  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    const setProfile = () => {
      setProfileImage(`${user?.profilePicture ? user.profilePicture : `/default-avatar.png`}`)
    }
    setProfile()
  }, [user])

  const [inputsChanged, setInputsChanged] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const inputs = [
    {
      name: "name",
      type: "text",
      label: user.userType === 'company' ? 'Company Name' : 'Name',
      placeholder: user.name
    },
    {
      name: "founded",
      type: "text",
      label: "Founded",
      placeholder: user.founded
    },
    {
      name: "industry",
      type: "text",
      label: "Industry",
      placeholder: user.industry
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      placeholder: user.location
    },
    {
      name: "numberOfLocations",
      type: "text",
      label: "Number of locations",
      placeholder: user.numberOfLocations
    },
    {
      name: "link",
      type: "text",
      label: "Website",
      placeholder: user.link
    },
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target
    formData.set(name, value)
    const isChanged = inputs.some(input => formData.get(input.name) !== user[input.name])
    setInputsChanged(isChanged)
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target
    if (files[0] instanceof File) {
      if (name == 'avatar') {
        setProfileImage(URL.createObjectURL(files[0]))
      }
    }
    setInputsChanged(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const avatarFile = document.querySelector('input[name="avatar"]').files[0]
    if (avatarFile) {
      formData.append(
        'avatar',
        avatarFile,
        `${user.username}_avatar${avatarFile.name.slice(avatarFile.name.lastIndexOf('.'))}`
      )
    }

    setIsPending(true)
    try {
      const response = await UpdateUserInfo(formData)
      let data = await response.json()
      setInputsChanged(false)
      storeUser(data.user)
      setIsPending(false)
    } catch (error) {
      console.error('Error:', error)
      setIsPending(false)
    }
  }

  return (
    <>
      <Header title={'Edit Profile'} Icon={PencilSquareIcon} />

      <form onSubmit={handleSubmit}>
        <div className="space-y-5 px-4 lg:px-6 py-28">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-black/10 pb-5 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <ChangeUsername
                user={user}
                username={newUsername}
                setUsername={setNewUsername}
              />

              <ChangeAvatar
                profileImage={profileImage}
                handleFileChange={handleFileChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-black/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-black">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">Use a permanent address where you can receive mail.</p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-4 md:col-span-2">
              {inputs.map((input) => (
                <div key={input.name}>
                  <Input
                    input={input}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 pb-6 mb-safe flex items-center justify-end gap-x-5 px-3">
          {/* <button
            type="button"
            className="text-sm/6 font-semibold text-black disabled:opacity-0 transition-all"
            disabled={!inputsChanged}
            onClick={() => window.location.reload()}
          >
            Cancel
          </button> */}
          <button
            className="rounded-xl bg-foreground text-background px-5 py-2 text-sm font-semibold shadow-sm md:hover:opacity-90 active:opacity-90 focus:outline disabled:bg-foreground disabled:opacity-10 disabled:md:hover:opacity-10 disabled:active:opacity-10 focus:outline-none transition-all"
            disabled={isPending || !inputsChanged}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

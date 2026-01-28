'use client'

import * as texts from '@/app/_text/common'

import { Radio, RadioGroup } from '@headlessui/react'

import { useActionState, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  registerUser as registerUserApi
} from '@/app/_lib/api/user'

import { storeUser } from '@/app/_lib/user'
import { classNames } from '@/app/_lib/general'

import { useToast } from '@/app/_ui/toast-context'

import Input from '@/app/_ui/form/input'
import Spinner from '@/app/_ui/spinner'

const settings = [
  {
    name: "Customer",
    link: "customer",
    description: "I'm not a company owner and just a buyer"
  },
  {
    name: "Company",
    link: "company",
    description: "The owner of the company"
  },
  {
    name: "EMC",
    link: "emc",
    description: "Export and Import company"
  },
]

export default function SignupForm({ emailSecret, setOpen }) {
  const [state, formAction, isPending] = useActionState(signup, null)
  const [userType, setUserType] = useState(settings[0].link)

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: userType === 'customer' ? 'ّFull Name' : 'Company Name'
    },
    {
      name: "username",
      type: "text",
      placeholder: "Username"
    },
  ]

  const router = useRouter()

  const { addToast } = useToast()

  async function signup(state, formData) {
    try {
      const name = formData.get('name')
      const username = formData.get('username')
      const secret = formData.get('secret')

      const response = await registerUserApi(
        name,
        username,
        userType,
        secret
      )
      if (!response?.ok) return
      const data = await response.json()
      storeUser(data)
      setOpen(false)
      router.push('/profile')
    } catch (error) {
      addToast({
        message: 'Already sent',
        description: 'A code has already been sent to this email. Please check your inbox.',
        type: 'error',
        position: 'bottom-9 left-4 md:bottom-5'
      })
    }
  }

  return (
    <>
      <fieldset aria-label="Privacy setting">
        <RadioGroup value={userType} onChange={setUserType} className="-space-y-px rounded-lg px-3 pt-5">
          {settings.map((setting, settingIdx) => (
            <Radio
              key={setting.name}
              value={setting.link}
              aria-label={setting.name}
              aria-description={setting.description}
              className={({ checked }) =>
                classNames(
                  settingIdx === 0 && 'rounded-t-xl',
                  settingIdx === settings.length - 1 && 'rounded-b-xl',
                  checked ? 'z-10 border-gray-400/25 bg-gray-300/25' : 'border-gray-400/25',
                  'relative flex cursor-pointer border p-3 focus:outline-none'
                )
              }
            >
              {({ focus, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked ? "bg-foreground border-transparent text-background text-[10px] after:content-['✓']" : 'bg-transparent border-gray-400/25',
                      focus ? 'ring-2 ring-offset-2 ring-foreground' : '',
                      "mt-0.5 size-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  />
                  <span className="ml-3 flex flex-col">
                    <span className={classNames(checked ? 'text-foreground' : 'text-gray-400', 'block text-sm font-medium')}>
                      {setting.name}
                    </span>
                    <span className={classNames(checked ? 'text-gray-400' : 'text-gray-400', 'block text-xs')}>
                      {setting.description}
                    </span>
                  </span>
                </>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px] px-3">
        <form className="space-y-4" action={formAction}>
          {inputs.map((input) => (
            <div key={input.name}>
              <Input input={input} />
              {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
            </div>
          ))}

          <input type="hidden" id="secret" name="secret" value={emailSecret} />

          <button
            className="flex w-full justify-center rounded-full bg-foreground text-background px-3 py-2.5 text-sm md:hover:opacity-90 active:opacity-90 focus:outline disabled:bg-foreground disabled:opacity-10 disabled:md:hover:opacity-10 disabled:active:opacity-10"
            type="submit"
          >
            {isPending ? <Spinner size="20" /> : texts.getStartedText}
          </button>
        </form>
      </div>
    </>
  )
}
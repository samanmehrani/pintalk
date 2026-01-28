'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Header from '../_ui/header'

const faqs = [
  {
    question: "How does your platform help exporters and manufacturers?",
    answers: [
      "We are a professional B2B platform that directly connects global suppliers with international buyers.",
      "We eliminate costly intermediaries and expensive trade fairs, reducing export marketing costs.",
      "With identity verification, smart supplier-buyer matching, and export consulting, we enhance the security and efficiency of international trade.",
    ]
  },
  {
    question: "Do I need to pay to use the platform?",
    answers: [
      "Registration is free.",
      "To access premium features such as advertising, export consulting, and direct connections with international buyers, we offer affordable premium plans.",
      "Our pricing is significantly lower than traditional methods like trade fairs and brokerage services.",
    ]
  },
  {
    question: "How can I connect with international buyers?",
    answers: [
      "Once you register and complete your supplier profile, your products will be displayed in global markets.",
      "Our AI-powered matching system connects you with verified international buyers.",
      "You can send direct trade proposals and receive price inquiries from global customers.",
    ]
  },
  {
    question: "How is transaction security ensured on the platform?",
    answers: [
      "All buyers and suppliers go through a multi-step verification process to ensure authenticity.",
      "We offer supplier and buyer rating systems based on their trade history.",
      "By collaborating with trusted logistics and international payment providers, we ensure secure and reliable transactions.",
    ]
  },
  {
    question: "What products can I sell on this platform?",
    answers: [
      "We focus on high-demand export products, including:",
      "✅ Petrochemical and oil-based products",
      "✅ Food and agricultural products",
      "✅ Handicrafts and textiles",
      "✅ Steel and mineral resources",
      "✅ Industrial and electronic equipment",
      "If your product has export potential, you can list it on our platform.",
    ]
  },
  {
    question: "Can small and medium-sized enterprises (SMEs) use the platform?",
    answers: [
      "Absolutely! Our platform is designed for businesses of all sizes, from startups to large enterprises.",
      " We help SMEs enter global trade without requiring large-scale investment in marketing or distribution.",
    ]
  },
  {
    question: "How can I access export consulting services?",
    answers: [
      "Our team of experts provides guidance on export regulations, international marketing, logistics, customs, and payment solutions.",
      "Users with premium memberships can book exclusive one-on-one consulting sessions.",
    ]
  },
  {
    question: "Is the platform free for international buyers?",
    answers: [
      "Yes! Buyers can register, browse products, and send purchase inquiries for free.",
      "This attracts a higher number of real buyers, increasing sales opportunities for suppliers.",
    ]
  },
  {
    question: "How can I promote my business on the platform?",
    answers: [
      "You can use premium advertising packages to feature your products in top search results.",
      "We also offer targeted marketing campaigns on international trade networks to help you reach the right buyers.",
    ]
  },
]

export default function FAQ() {
  return (
    <>
      <Header title={'Frequently asked questions'} Icon={QuestionMarkCircleIcon} />

      <div className="mx-auto max-w-7xl px-3 lg:px-8 pb-40 pt-28">
        <div className="mx-auto max-w-4xl divide-y divide-gray-400/25">
          <dl className="space-y-4 divide-y divide-gray-400/25">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-4">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="flex w-full items-start justify-between text-left">
                        <span className="text-sm font-semibold">{faq.question}</span>
                        <span className="ml-4 flex h-7 items-center">
                          {open ? (
                            <MinusIcon className="size-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="size-5" aria-hidden="true" />
                          )}
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-1.5 pr-10">
                      {faq.answers.map((answer, index) => (
                        <p key={index} className="text-xs/5 text-gray-400">{answer}</p>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}

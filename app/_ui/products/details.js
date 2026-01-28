'use client'

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Radio,
    RadioGroup,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'

// Icons
import {
    Icon,
    starIcon,
    heartIcon,
    plusIcon,
    minusIcon,
} from '@/app/ui/icons'

const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // More images...
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        {
            name: 'Care',
            items: [
                'Spot clean as needed',
                'Hand wash with mild soap',
                'Machine wash interior dividers',
                'Treat handle and tabs with leather conditioner',
            ]
        }
        // More sections...
    ],
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Details({ details }) {
    return (
        <section aria-labelledby="details-heading" className="mt-12">
            <h2 id="details-heading" className="sr-only">
                Additional details
            </h2>

            <div className="divide-y divide-gray-200 border-t">
                {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                        {({ open }) => (
                            <>
                                <h3>
                                    <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                                        <span
                                            className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                                        >
                                            {detail.name}
                                        </span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                                <Icon
                                                    name={minusIcon}
                                                    className="block size-6 text-indigo-400 group-hover:text-indigo-500"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Icon
                                                    name={plusIcon}
                                                    className="block size-6 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel as="div" className="prose prose-sm pb-6">
                                    <ul role="list">
                                        {detail.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </section>
    )
}
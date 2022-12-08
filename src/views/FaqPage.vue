<template>
  <div class="bg-gray-50">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl divide-y-2 divide-gray-200">
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently asked questions
        </h2>
        <dl class="mt-6 space-y-6 divide-y divide-gray-200">
          <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pt-6" v-slot="{ open }">
            <dt class="text-lg">
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-400">
                <span class="font-medium text-gray-900">{{ faq.question }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']"
                    aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p class="text-base text-gray-500">{{ faq.answer }}</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const faqs = [
  {
    question: "What do I need to rent a car?",
    answer:
      "Each person who intends to drive must bring a valid driver's license to drive, a passport, and a valid means of payment (generally via credit card). All of these items must be submitted on the website you fill up. Kindly pay with an affiliated credit card. If you wish to pay in cash, you must also submit an item of identification (copies are acceptable) in addition to your driver's license.",
  },
  {
    question: "Can anyone besides the reservation applicant drive the car?",
    answer:
      "Yes,	however, each person who intends to drive the car must submit a valid driver’s license on the day the car will be picked up. If it is not possible for all drivers to be present on the day of pick-up, a copy of their driver’s license (both sides) and passport must be prepared in advance and submitted.",
  },
  {
    question: "How many days in advance can a reservation be made?",
    answer:
      "Vehicles can be reserved seven days in advance. Reservations can also be made 24 hours* prior to pick-up if a vehicle is required at the last minute.",
  },

  {
    question: "Can I rent a car without a reservation?",
    answer:
      "Yes, as long as a vehicle is available in the station; however, we recommend making a reservation because no vehicle may be available during busy periods.",
  },

  {
    question: "Can I cancel my reservation?",
    answer:
      "Yes, reservations can be cancelled. Please contact us as soon as possible if you wish to cancel your reservation. The reservation number issued when you made the reservation and the email address you registered at the time of reservation are required to cancel or make changes to your reservation.",
  },
  {
    question: "Can I make changes to my reservation?",
    answer:
      "Yes. The reservation number issued when you made the reservation and the email address you registered at the time of reservation are required to make changes to your reservation.",
  },
  {
    question: "What happens if I arrive late when picking up the car?",
    answer:
      "Please make sure to contact the concerned station if you are going to arrive later than the specified pick-up time. Failure to contact the station will cause the reservation to be cancelled an hour after the scheduled pick-up time. The vehicle may also not be available anymore at the time of pick-up.",
  },
  {
    question: "What should I do if I damage the car?",
    answer:
      "In the event that the customer causes an accident or defacement to the vehicle during the rental period, the user shall be required to pay the non-operation charge (NOC) as partial compensation for the loss of earnings incurred for repairs or cleaning, regardless of the degree of damage or the length of time required for repairs/cleaning. The non-operation charge (NOC) is different from the deductible (paid by the user) in the insurance and compensation system, which is applied in the event of accidents. Please note that this sum is to be paid even if you are subscribed to the Safety Package.",
  },
  // More questions...
]
</script>
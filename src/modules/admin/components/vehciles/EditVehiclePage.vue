<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { getVehicleById } from './composables/vehcile-composables';
import SelectColor from '../settings/color-utilities/SelectColor.vue';
import SelectTracker from '../settings/tracker-utilities/SelectTracker.vue';
import SelectFuelType from '../settings/fuel-type-utilities/SelectFuelType.vue';
import ImagesViewer from './utilities/ImagesViewer.vue';

const props = defineProps({
    id: null
})
const vehicle = ref(null)
const loading = ref(true)

const getVehicleInfo = async () => {
    loading.value = true
    const { data, load } = getVehicleById(props.id)
    await load()
    vehicle.value = data.value
    loading.value = false
}

const onHandleChangeColor = (item) => {
    console.log('Selected item', item)
}

const onHandleChange = (item) => {
    console.log('Selected item', item)
}

const onHandleChangeFuelType = (item) => {
    console.log('Selected item', item)
}

onMounted(async () => {
    await getVehicleInfo();
})

const products = [
    {
        id: 1,
        title: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Black',
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    // More products...
]
const deliveryMethods = [
    { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
    { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
]

const selectedDeliveryMethod = ref(deliveryMethods[0])

const product = {
    name: 'Basic Tee',
    price: '$35',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Women', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            id: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
            imageAlt: "Back of women's Basic Tee in black.",
            primary: true,
        },
        {
            id: 2,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
            imageAlt: "Side profile of women's Basic Tee in black.",
            primary: false,
        },
        {
            id: 3,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
            imageAlt: "Front of women's Basic Tee in black.",
            primary: false,
        },
    ],
    colors: [
        { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
        { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
    ],
    sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: false },
    ],
    description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
    details: [
        'Only the best materials',
        'Ethically and locally made',
        'Pre-washed and pre-shrunk',
        'Machine wash cold with similar colors',
    ],
}
</script>
<template>
    <div class="bg-gray-50">
        <div v-if="!loading" class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Vehicle Information</h2>

            <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                    <div>
                        <h2 class="text-lg font-medium text-gray-900">Vehicle information</h2>

                        <div class="mt-4">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">
                                Model:
                            </label>
                            <div class="mt-1">
                                <input type="text" v-model="vehicle.model"
                                    class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h2 class="text-lg font-medium text-gray-900">Model information</h2>

                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <div class="mt-1">
                                    <SelectColor v-model="vehicle.color" :onHandleChangeColor="onHandleChangeColor" />
                                </div>
                            </div>

                            <div>
                                <div class="mt-1">
                                    <SelectTracker v-model="vehicle.tracker" :onHandleChange="onHandleChange" />
                                </div>
                            </div>
                            <div>
                                <div class="mt-1">
                                    <SelectFuelType v-model="vehicle.fuel_type"
                                        :onHandleChangeFuelType="onHandleChangeFuelType" />
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Fuel Capacity
                                    (L)</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.fuel_capacity"
                                        placeholder="Fuel Capacity"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Fuel Consumptions
                                    (per km)</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.fuel_consumption"
                                        placeholder="Fuel Consumptions"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Odemeter</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.odemeter" placeholder="Odemeter"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="company" class="block text-sm font-medium text-gray-700">Plate
                                    Number</label>
                                <div class="mt-1">
                                    <input type="text" v-model="vehicle.plate_number" placeholder="Plate Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h2 class="text-lg font-medium text-gray-900">Legal information</h2>

                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">CR No.</label>
                                <div class="mt-2">
                                    <input type="text" min="1" v-model="vehicle.fuel_capacity" placeholder="CR Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Engine No.</label>
                                <div class="mt-2">
                                    <input type="text" min="1" v-model="vehicle.fuel_consumption"
                                        placeholder="Engine Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Chassis No.</label>
                                <div class="mt-2">
                                    <input type="text" min="1" v-model="vehicle.fuel_consumption"
                                        placeholder="Chassis Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">CR Expiration
                                    Date</label>
                                <div class="mt-2">
                                    <input type="date" min="1" v-model="vehicle.fuel_consumption"
                                        placeholder="Expiration Date"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order summary -->
                <div class="mt-10 lg:mt-0">
                    <h2 class="text-lg font-medium text-gray-900">Images</h2>

                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <h3 class="sr-only">Items in your cart</h3>
                        <ImagesViewer :imagesData="product.images"/>

                        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <button type="submit"
                                class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Confirm
                                order</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
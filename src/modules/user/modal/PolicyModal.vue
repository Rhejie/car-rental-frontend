<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCloseModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-2/5 sm:p-6">
                            <div>
                                <div class="mx-auto flex text-center h-12 w-12 items-center rounded-full bg-green-100">
                                    <CheckIcon class="h-6 w-6 mx-auto text-green-600" aria-hidden="true" />
                                </div>
                                <div class=" sm:mt-5">
                                    <DialogTitle as="h3"
                                        class="text-lg mt-3 text-center font-medium leading-6 text-gray-900">Terms and
                                        Conditions</DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-lg font-bold text-gray-500">Welcome to APC Car Rental!</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            These terms and conditions outline the rules and regulations for the use of
                                            APC Car Rental's Website, located at apccarrental.com.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            By accessing this website we assume you accept these terms and conditions.
                                            Do not continue to use APC Car Rental if you do not agree to take all of the
                                            terms and conditions stated on this page
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            The following terminology applies to these Terms and Conditions, Privacy
                                            Statement and Disclaimer Notice and all Agreements: "Client", "You" and
                                            "Your" refers to you, the person log on this website and compliant to the
                                            Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and
                                            "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the
                                            Client and ourselves. All terms refer to the offer, acceptance and
                                            consideration of payment necessary to undertake the process of our
                                            assistance to the Client in the most appropriate manner for the express
                                            purpose of meeting the Client’s needs in respect of provision of the
                                            Company’s stated services, in accordance with and subject to, prevailing law
                                            of Netherlands. Any use of the above terminology or other words in the
                                            singular, plural, capitalization and/or he/she or they, are taken as
                                            interchangeable and therefore as referring to same.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Copyright Notice</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            You, the User, acknowledge that all content included on this Site, including 
                                            the information, data, software, photographs, graphs, video, typefaces, graphics,
                                             music, sounds, images, illustrations, maps, designs, icons, written and other 
                                             material (collectively, “Content”) and the arrangement and compilation of the 
                                             Content are intellectual property and copyrighted works of APC Car Rental and/or 
                                             its third-party providers including, without limitation, the airline, hotels, 
                                             rental car companies and other travel suppliers that provide travel or other 
                                             services through this Site (“Providers”). Reproduction or storage of information 
                                             or works retrieved from this Site, in all forms, media and technologies now 
                                             existing or hereafter developed, is subject to the U.S. Copyright Act of 1976, 
                                             Title 17 of the United States Code, or other applicable laws, and all applicable 
                                             international copyright treaties and conventions, including without limitation, 
                                             the Berne Convention and the Universal Copyright Convention.
                                        </p>
                                        <br />
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Acceptable Use/License</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            APC Car Rental Transport Limited grants you a limited, personal, nontransferable, non-sublicensable, 
                                            revocable license to access and use this Site only as expressly permitted in this Agreement. Except 
                                            for this limited license, we do not grant you any other rights or license with respect to this Site; 
                                            any rights or license not expressly granted herein are reserved. The content and information on this 
                                            Site (including, without limitation, price and availability of travel services), as well as the 
                                            infrastructure used to provide such content and information, is proprietary to APC Car Rental or 
                                            its suppliers and Providers. Accordingly, as a condition of using this Site, you agree not to use 
                                            this Site or its contents or information for any commercial or non-personal purpose (direct or indirect) 
                                            or for any purpose that is unlawful or prohibited by this Agreement. While you may make limited copies 
                                            of your travel itinerary (and related documents) for travel or services purchased through this Site, you 
                                            agree not to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create 
                                            derivative works from, transfer, or sell or re-sell any information, software, products, or services 
                                            obtained from this Site. In addition, whether or not you have a commercial purpose, you agree not to:
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            1. access, monitor or copy any content or information of this Site using any robot, spider, scraper or 
                                            other automated means or any manual process for any purpose without express written permission of APC Car Rental;
                                        </p>
                                        <br />
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            2. violate the restrictions in any robot exclusion headers on this Site or bypass or circumvent other 
                                            measures employed to prevent or limit access to this Site;
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            3. take any action that imposes, or may impose, in the discretion of APC Car Rental, an unreasonable 
                                            or disproportionately large load on the APC Car Rental infrastructure; or
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            4. deep-link to any portion of this Site (including, without limitation, the purchase path for any travel 
                                            services) for any purpose without express written permission of APC Car Rental.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            5. deliver any unlawful (according to local, state, federal, or international law or regulation) postings 
                                            to or through the this Site, or any postings which advocate illegal activity.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            6. impersonate another person or entity or falsely state or otherwise misrepresent your affiliation with 
                                            a person or entity, or adopt a false identity if the purpose of doing so is to mislead, deceive, or defraud another.
                                        </p>
                                        <br />
                                        <p>
                                            APC Car Rental reserves the right to cancel any airline, hotel or rental car reservation or any other transaction 
                                            that it reasonably believes to have been fraudulently made, including without limitation, by unauthorized use of 
                                            a credit or debit card.
                                        </p>
                                        <p class="text-md font-bold text-gray-500">Privacy Notice</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            You confirm that you have read our Privacy Notice, the terms of which are incorporated herein, and agree that 
                                            the terms of such policy are reasonable and satisfactory to you. You consent to the use of your personal information 
                                            by APC Car Rental and/or its third-party providers and distributors in accordance with the terms of and for the 
                                            purposes set forth in the Privacy Notice. To the extent permitted by law, APC Car Rental makes no representation 
                                            or warranty with regard to the sufficiency of the security measures used for data handling and storage. APC Car 
                                            Rental will not be responsible for any actual or consequential damages that result from a lapse in compliance 
                                            with the Privacy Notice because of a security breach or technical malfunction.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Disclaimer of Warranties</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            UNLESS A PROVIDER HAS AGREED OTHERWISE, ALL CONTENT, INCLUDING SOFTWARE, PRODUCTS, SERVICES, INFORMATION, TEXT AND 
                                            RELATED GRAPHICS CONTAINED WITHIN OR AVAILABLE THROUGH THIS SITE ARE PROVIDED TO YOU ON AN “AS IS,” “AS AVAILABLE” 
                                            BASIS. APC CAR RENTAL MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, AS TO THE 
                                            OPERATION OF THIS WEBSITE OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED ON THIS WEBSITE TO THE FULLEST EXTENT 
                                            PERMISSIBLE PURSUANT TO APPLICABLE LAW, APC CAR RENTAL DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES OF ANY KIND, 
                                            EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY OR SATISFACTORY 
                                            WORKMANLIKE EFFORT, INFORMATIONAL CONTENT, TITLE, OR NON-INFRINGEMENT OF THE RIGHTS OF THIRD PARTIES. APC CAR RENTAL 
                                            DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS THAT THIS SITE WILL OPERATE ERROR-FREE OR UNINTERRUPTED, THAT DEFECTS 
                                            WILL BE CORRECTED, OR THAT THIS SITE AND/OR ITS SERVERS WILL BE FREE OF VIRUSES AND/OR OTHER HARMFUL COMPONENTS. APC 
                                            CAR RENTAL DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING SUITABILITY, AVAILABILITY, ACCURACY, RELIABILITY, 
                                            COMPLETENESS, OR TIMELINESS OF ANY MATERIAL OF ANY KIND CONTAINED WITHIN THIS SITE FOR ANY PURPOSE, INCLUDING SOFTWARE, 
                                            PRODUCTS, SERVICES, INFORMATION, TEXT AND RELATED GRAPHICS CONTENT.
                                        </p>
                                        <br />
                                        <P class="text-sm text-gray-500">
                                            APC CAR RENTAL IS NOT RESPONSIBLE FOR ANY FAILURES CAUSED BY SERVER ERRORS, MISDIRECTED OR REDIRECTED TRANSMISSIONS, 
                                            FAILED INTERNET CONNECTIONS, INTERRUPTIONS IN THE TRANSMISSION OR RECEIPT OF TICKET ORDERS OR, ANY COMPUTER VIRUS OR 
                                            OTHER TECHNICAL DEFECT, WHETHER HUMAN OR TECHNICAL IN NATURE.
                                        </P>
                                        <br />
                                        <P class="text-sm text-gray-500">
                                            WITHOUT LIMITING THE FOREGOING, NO WARRANTY OR GUARANTEE IS MADE (I) REGARDING THE ACCEPTANCE OF ANY REQUEST, (II) 
                                            THAT A USER WILL RECEIVE THE LOWEST AVAILABLE PRICE FOR GOODS AND/OR SERVICES AVAILABLE THROUGH THIS SITE, (III) 
                                            REGARDING THE AVAILABILITY OF PRODUCTS AND/OR SERVICES THROUGH THIS SITE OR, WHERE APPLICABLE, AT ANY PARTICIPATING 
                                            RETAILER OR RETAILER LOCATION, OR (IV) REGARDING THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THIS SITE.
                                        </P>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">General Limitation of Liability</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            TO THE EXTENT PERMITTED BY LAW, IN NO EVENT SHALL APC CAR RENTAL, INCLUDING ITS RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, 
                                            REPRESENTATIVES, SUBSIDIARIES, AFFILIATES, DISTRIBUTORS, SUPPLIERS, LICENSORS, AGENTS OR OTHERS INVOLVED IN CREATING, 
                                            SPONSORING, PROMOTING, OR OTHERWISE MAKING AVAILABLE THE SITE AND ITS CONTENTS (COLLECTIVELY THE “COVERED PARTIES”), 
                                            BE LIABLE TO ANY PERSON OR ENTITY WHATSOEVER FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, COMPENSATORY, 
                                            CONSEQUENTIAL, OR PUNITIVE DAMAGES OR ANY DAMAGES WHATSOEVER, INCLUDING BUT NOT LIMITED TO: (I) LOSS OF GOODWILL, 
                                            PROFITS, BUSINESS INTERRUPTION, DATA OR OTHER INTANGIBLE LOSSES; (II) YOUR INABILITY TO USE, UNAUTHORIZED USE OF, 
                                            PERFORMANCE OR NON-PERFORMANCE OF THE SITE; (III) UNAUTHORIZED ACCESS TO OR TAMPERING WITH YOUR PERSONAL INFORMATION 
                                            OR TRANSMISSIONS; (IV) THE PROVISION OR FAILURE TO PROVIDE ANY SERVICE; (V) ERRORS OR INACCURACIES CONTAINED ON THE 
                                            SITE OR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS OBTAINED THROUGH THE SITE; (VI) ANY 
                                            TRANSACTIONS ENTERED INTO THROUGH THIS SITE; (VII) ANY PROPERTY DAMAGE INCLUDING DAMAGE TO YOUR COMPUTER OR COMPUTER 
                                            SYSTEM CAUSED BY VIRUSES OR OTHER HARMFUL COMPONENTS, DURING OR ON ACCOUNT OF ACCESS TO OR USE OF THIS SITE OR ANY SITE 
                                            TO WHICH IT PROVIDES HYPERLINKS; OR (VIII) DAMAGES OTHERWISE ARISING OUT OF THE USE OF THE SITE, ANY DELAY OR INABILITY 
                                            TO USE THE SITE, OR ANY INFORMATION, PRODUCTS, OR SERVICES OBTAINED THROUGH THE SITE. THE LIMITATIONS OF LIABILITY SHALL 
                                            APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN 
                                            IF A COVERED PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. Further, to the extent permitted by law, the Covered 
                                            Parties accept no responsibilities for any damage and/or delay due to Provider cancellations, shortages, sickness, pilferage, 
                                            labor disputes, bankruptcy, machinery breakdown, quarantine, government restraints, weather, terrorism or causes beyond 
                                            the Covered Parties’ control. No responsibility is accepted for any additional expense, omissions, delays, re-routing or 
                                            acts of any governmental authority. No Covered Party shall be responsible for any Provider’s breach of any warranty 
                                            including, but not limited to, implied warranties of fitness for a particular purpose or of merchantability, nor shall 
                                            any Covered Party be responsible for any other wrongdoing of a Provider (including any liability in tort), as to any 
                                            products and/or services available through this Site. No Covered Party shall be responsible for any Provider’s failure 
                                            to comply with this Agreement nor for any Provider’s failure to comply with applicable federal, state, provincial and local law.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            If, notwithstanding the above, a Covered Party is found liable for any loss or damage relating to the use of this Site, 
                                            User agrees the liability of any such party shall in no event exceed the total charge to the User assessed by APC Car 
                                            Rental for making a Request. Some states or jurisdictions, to the extent their law might be deemed to apply notwithstanding 
                                            the selection of Connecticut law as described below, do not allow the limitation of liability, so the foregoing limitations 
                                            might not apply to you.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Indemnification</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            You agree to defend and indemnify APC Car Rental Transport Limited, their affiliates, and/or their respective suppliers 
                                            and any of their officers, directors, employees and agents from and against any claims, causes of action, demands, recoveries, 
                                            losses, damages, fines, penalties or other costs or expenses of any kind or nature including but not limited to reasonable 
                                            legal and accounting fees, brought (i) by you or on behalf of you in excess of the liability described above, within the 
                                            limits permitted by applicable law; or (ii) by third parties as a result of:
                                        </p>
                                        <ul>
                                            <li>
                                                • Your breach of this Agreement
                                            </li>
                                            <li>
                                                • your violation of any law or the rights of a third party; or
                                            </li>
                                            <li>
                                                • your use of this Site in violation of the terms and conditions set forth herein.
                                            </li>
                                        </ul>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Booking information</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                         To make a booking you must complete our booking form which is easy to follow and secured with the latest encryption technology. 
                                         Once we receive your form, we will check availability and carry out any additional fraud checks we think are appropriate (which 
                                         may involve us asking you to provide further information).  We may decline your booking at this stage. However, if we confirm 
                                         your booking, we will email you a confirmation voucher and invoice. The deposit payment required to secure your vehicle (as 
                                         shown on the secure booking page) will only be processed when your booking is confirmed. Please note that a payment surcharge 
                                         processing fee (as specified at the time of booking) will be added when your payment is processed.
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            A booking is confirmed when you have been emailed a confirmation voucher and at this stage your initial deposit payment is 
                                            processed and becomes non-refundable and any cancellation fees stated in the Third Party Providers terms apply. Upon receipt 
                                            of your confirmation, please check your details carefully and notify us immediately if there are any incorrect details, as 
                                            it may not be possible to make changes at a later date.
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            If you are booking via phone, please make sure you have read the terms and conditions of the vehicle you wish to rent first. 
                                            Our reservations consultant will ask you if you have read the terms and agree to them before proceeding. The onus is always 
                                            on the renter to ensure they make themselves fully aware of the terms displayed on our website.
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            You acknowledge and agree that we may receive a commission, revenue share, technology service provider fee or marketing fee 
                                            from bookings and other transactions entered into by you using our booking service or website. 
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Adding delegates to your booking</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            For some bookings, it may be possible to add a delegate who is authorized to act on your behalf and make changes to the booking.  
                                            A delegate must be at least 18 years old and will be able to change any aspect of your existing booking, including changes that 
                                            may incur an additional charge. But you will still be the only one able to cancel the booking or add or remove delegates. 
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            If you choose to add a delegate to your booking, you agree:
                                        </p>
                                        <ul>
                                            <li>
                                                • to obtain the delegate’s permission before providing us their personal information; and
                                            </li>
                                            <li>
                                                • to accept any changes made (and additional charges incurred) by your nominated delegate.
                                            </li>
                                        </ul>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Modification/Termination of Usage</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            APC Car Rental reserves the right, in its sole discretion, to modify, suspend, or terminate this Site and/or any portion thereof, 
                                            including any service or product available through the Site, and/or your profile, password, or use of the Site, or any portion thereof, 
                                            at any time for any reason with or without notice to you. In the event of termination, you will still be bound by your obligations 
                                            under this Agreement and any Additional Terms, including the warranties made by you, and by the disclaimers and limitations 
                                            of liability. Additionally, APC Car Rental shall not be liable to you or any third-party for any termination of your access 
                                            to this Site.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Information disclosure</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            In booking on this website you agree that we may disclose your information to (i) your selected Third Party Provider in order 
                                            for them to provide the requested rental services to you; and (ii) our third Party insurance provider, for them to provide 
                                            insurance to you (if applicable) or as otherwise set out below. By making a booking on the site, you also agree that we (or 
                                            our third party insurance provider) may email you with an insurance offer in respect of that booking. Your selected Third Party 
                                            Provider or third party insurance provider may not have equivalent privacy policies in place to us.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Refund and Cancellation Policy</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            We are committed to providing a quality service and aim for complete customer satisfaction. In the event of cancellation, 
                                            any refunds, credits or cancellation charges that apply are detailed in the terms and conditions of the Third Party Provider 
                                            of your selected vehicle. In the event you are unsatisfied with our booking service, please contact us within 48 hours of 
                                            placing your booking or request and we will work to resolve any issues and determine if compensation is due. In the event 
                                            you have completed your rental and are unhappy with your vehicle, we are happy to assist you in seeking compensation from 
                                            the Third Party Provider.
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Sometimes a booking may need to be cancelled because of circumstances beyond either party’s control. For example, a weather 
                                            event, public health event (including epidemic/pandemic), medical emergencies, strike, terrorist act, governmental, regional 
                                            or local authority restrictions (such as restrictions on movement due to the COVID-19 pandemic) or a change in law. If this 
                                            occurs, your entitlement to a credit or refund will be as provided in your Third Party Provider’s terms and conditions. 
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            You agree that you will raise and resolve any dispute over refunds or cancellations in respect of your booking (whether 
                                            initiated by you, the Third Party Provider or by circumstances beyond the reasonable control of either party, including as 
                                            a result of government travel restrictions, the COVID 19 pandemic or the insolvency of your Third Party Provider) directly 
                                            with the Third Party Provider.  Once you have made payment for your booking, you must not seek to reverse or cancel such 
                                            payment through your card issuer or its agents without our prior consent. 
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            We shall only be liable to provide a refund to you (whether that cancellation is initiated by you, the Third Party Provider 
                                            or due to circumstances beyond the reasonable control of either party, including as a result of government travel restrictions, 
                                            the COVID 19 pandemic or the insolvency of your Third Party Provider) to the extent that we actually receive a refund from the 
                                            relevant Third Party Provider. Where refunds are due to you from a Third Party Provider, we will provide reasonable assistance 
                                            to you in claiming such funds from that Third Party Provider.  In that situation, you authorise us to seek such refunds from 
                                            the travel provider directly and on your behalf. 
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Where a refund is applicable, the turnaround time from the date of your request for refund to the date you are provided with 
                                            your refund may take up to 12 weeks.  This is beyond our control. 
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            We are not responsible (including in negligence) to you for any failure or delay on the part of any Third Party Provider in 
                                            providing travel products to you where the booking has been properly processed.
                                        </p>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:text-sm"
                                    @click="handleCloseModal">Go back to register</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(['closeModal'])
const open = computed(() => props.openModal)

const handleCloseModal = () => {
    emit('closeModal')
}
</script>
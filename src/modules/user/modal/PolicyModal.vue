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
                                        <p class="text-md font-bold text-gray-500">Cookies</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            We employ the use of cookies. By accessing APC Car Rental, you agreed to use
                                            cookies in agreement with the APC Car Rental's Privacy Policy.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            Most interactive websites use cookies to let us retrieve the user’s details
                                            for each visit. Cookies are used by our website to enable the functionality
                                            of certain areas to make it easier for people visiting our website. Some of
                                            our affiliate/advertising partners may also use cookies.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">License</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            Unless otherwise stated, APC Car Rental and/or its licensors own the
                                            intellectual property rights for all material on APC Car Rental. All
                                            intellectual property rights are reserved. You may access this from APC Car
                                            Rental for your own personal use subjected to restrictions set in these
                                            terms and conditions.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            You must not:
                                        </p>
                                        <br />
                                        <ul>
                                            <li class="text-sm text-gray-500">• Republish material from APC Car Rental
                                            </li>
                                            <li class="text-sm text-gray-500">• Sell, rent or sub-license material from
                                                APC Car Rental</li>
                                            <li class="text-sm text-gray-500">• Reproduce, duplicate or copy material
                                                from
                                                APC Car Rental</li>
                                            <li class="text-sm text-gray-500">• Redistribute content from APC Car Rental
                                            </li>
                                        </ul>
                                        <br />
                                        <p class="text-sm text-gray-500">This Agreement shall begin on the date hereof.
                                            Our Terms and Conditions were created with the help of the Free Terms and
                                            Conditions Generator.</p>
                                        <br />
                                        <p class="text-sm text-gray-500">Parts of this website offer an opportunity for
                                            users to post and exchange opinions and information in certain areas of the
                                            website. APC Car Rental does not filter, edit, publish or review Comments
                                            prior to their presence on the website. Comments do not reflect the views
                                            and opinions of APC Car </p>
                                        <br />
                                        <p class="text-sm text-gray-500">Rental,its agents and/or affiliates. Comments
                                            reflect the views and opinions of the person who post their views and
                                            opinions. To the extent permitted by applicable laws, APC Car Rental shall
                                            not be liable for the Comments or for any liability, damages or expenses
                                            caused and/or suffered as a result of any use of and/or posting of and/or
                                            appearance of the Comments on this website.</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            APC Car Rental reserves the right to monitor all Comments and to remove any
                                            Comments which can be considered inappropriate, offensive or causes breach
                                            of these Terms and Conditions.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            You warrant and represent that
                                        </p>
                                        <br />
                                        <ul>
                                            <li class="text-sm text-gray-500">
                                                • You are entitled to post the Comments on our website and have all
                                                necessary licenses and consents to do so;
                                            </li>
                                            <li class="text-sm text-gray-500">
                                                • The Comments do not invade any intellectual property right, including
                                                without limitation copyright, patent or trademark of any third party;
                                            </li>
                                            <li class="text-sm text-gray-500">
                                                • The Comments do not contain any defamatory, libelous, offensive,
                                                indecent or otherwise unlawful material which is an invasion of privacy
                                            </li>
                                            <li class="text-sm text-gray-500">
                                                • The Comments will not be used to solicit or promote business or custom
                                                or present commercial activities or unlawful activity.
                                            </li>
                                            <br />
                                            <p class="text-sm text-gray-500">
                                                You hereby grant APC Car Rental a non-exclusive license to use,
                                                reproduce, edit and authorize others to use, reproduce and edit any of
                                                your Comments in any and all forms, formats or media.
                                            </p>
                                        </ul>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Hyperlinking to our Content</p>
                                        <br />
                                        <p class="text-sm text-gray-500">The following organizations may link to our
                                            Website without prior written approval:</p>
                                        <br />
                                        <ul>
                                            <li class="text-sm text-gray-500">• Government agencies;</li>
                                            <li class="text-sm text-gray-500">• Search engines;</li>
                                            <li class="text-sm text-gray-500">• News organizations</li>
                                            <li class="text-sm text-gray-500">• Online directory distributors may link
                                                to our Website in the same manner as they hyperlink to the Websites of
                                                other listed businesses; and</li>
                                            <li class="text-sm text-gray-500">• System wide Accredited Businesses except
                                                soliciting non-profit organizations, charity shopping malls, and charity
                                                fundraising groups which may not hyperlink to our Web site.</li>
                                        </ul>
                                        <br />
                                        <p class="text-sm text-gray-500">These organizations may link to our home page,
                                            to publications or to other Website information so long as the link: (a) is
                                            not in any way deceptive; (b) does not falsely imply sponsorship,
                                            endorsement or approval of the linking party and its products and/or
                                            services; and (c) fits within the context of the linking party’s site.</p>
                                        <br />
                                        <p class="text-sm text-gray-500">We may consider and approve other link requests
                                            from the following types of organizations:</p>
                                        <br />
                                        <ul>
                                            <li class="text-sm text-gray-500">• commonly-known consumer and/or business
                                                information sources;</li>
                                            <li class="text-sm text-gray-500">• dot.com community sites;</li>
                                            <li class="text-sm text-gray-500">• associations or other groups
                                                representing charities;</li>
                                            <li class="text-sm text-gray-500">• online directory distributors;</li>
                                            <li class="text-sm text-gray-500">• internet portals;</li>
                                            <li class="text-sm text-gray-500">• accounting, law and consulting firms;
                                                and</li>
                                            <li class="text-sm text-gray-500">• educational institutions and trade
                                                associations.</li>
                                        </ul>
                                        <br />
                                        <p class="text-sm text-gray-500">We will approve link requests from these
                                            organizations if we decide that: (a) the link would not make us look
                                            unfavorably to ourselves or to our accredited businesses; (b) the
                                            organization does not have </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            any negative records with us; (c) the benefit to us from the visibility of
                                            the hyperlink compensates the absence of APC Car Rental; and (d) the link is
                                            in the context of general resource information.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            These organizations may link to our home page so long as the link: (a) is
                                            not in any way deceptive; (b) does not falsely imply sponsorship,
                                            endorsement or approval of the linking party and its products or services;
                                            and (c) fits within the context of the linking party’s site.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            If you are one of the organizations listed in paragraph 2 above and are
                                            interested in linking to our website, you must inform us by sending an
                                            e-mail to APC Car Rental. Please include your name, your organization name,
                                            contact information as well as the URL of your site, a list of any URLs from
                                            which you intend to link to our Website, and a list of the URLs on our site
                                            to which you would like to link. Wait 2-3 weeks for a response.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            Approved organizations may hyperlink to our Website as follows:
                                        </p>
                                        <br />
                                        <ul>
                                            <li class="text-sm text-gray-500">• By use of our corporate name; or</li>
                                            <li class="text-sm text-gray-500">• By use of the uniform resource locator
                                                being linked to; or</li>
                                            <li class="text-sm text-gray-500">• By use of any other description of our
                                                Website being linked to that makes sense within the context and format
                                                of content on the linking party’s site.</li>
                                        </ul>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            No use of APC Car Rental's logo or other artwork will be allowed for linking
                                            absent a trademark license agreement
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">iFrames</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            Without prior approval and written permission, you may not create frames
                                            around our Webpages that alter in any way the visual presentation or
                                            appearance of our Website.
                                        </p>
                                        <p class="text-md font-bold text-gray-500">Content Liability</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            We shall not be hold responsible for any content that appears on your
                                            Website. You agree to protect and defend us against all claims that is
                                            rising on your Website. No link(s) should appear on any Website that may be
                                            interpreted as libelous, obscene or criminal, or which infringes, otherwise
                                            violates, or advocates the infringement or other violation of, any third
                                            party rights.
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Your Privacy</p>
                                        <br />
                                        <p class="text-sm text-gray-500">Please read Privacy Policy</p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Reservation of Rights</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            We reserve the right to request that you remove all links or any particular
                                            link to our Website. You approve to immediately remove all links to our
                                            Website upon request. We also reserve the right to amen these terms and
                                            conditions and it’s linking policy at any time. By continuously linking to
                                            our Website, you agree to be bound to and follow these linking terms and
                                            conditions.
                                        </p>
                                        <br/>
                                        <p class="text-md font-bold text-gray-500">Removal of links from our website</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            If you find any link on our Website that is offensive for any reason, you
                                            are free to contact and inform us any moment. We will consider requests to
                                            remove links but we are not obligated to or so or to respond to you
                                            directly.
                                        </p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            We do not ensure that the information on this website is correct, we do not
                                            warrant its completeness or accuracy; nor do we promise to ensure that the
                                            website remains available or that the material on the website is kept up to
                                            date
                                        </p>
                                        <br />
                                        <p class="text-md font-bold text-gray-500">Disclaimer</p>
                                        <br />
                                        <p class="text-sm text-gray-500">
                                            To the maximum extent permitted by applicable law, we exclude all
                                            representations, warranties and conditions relating to our website and the
                                            use of this website. Nothing in this disclaimer will:
                                        </p>
                                        <br />

                                        <ul>
                                            <li class="text-sm text-gray-500">• limit or exclude our or your liability
                                                for death or personal injury;</li>
                                            <li class="text-sm text-gray-500">• limit or exclude our or your liability
                                                for fraud or fraudulent misrepresentation;</li>
                                            <li class="text-sm text-gray-500">• limit any of our or your liabilities in
                                                any way that is not permitted under applicable law; or</li>
                                            <li class="text-sm text-gray-500">•	Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                                        </ul>
                                        <br/>
                                        <p class="text-sm text-gray-500">
                                            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                                        </p>
                                        <br/>
                                        <p class="text-sm text-gray-500">
                                            As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                                        </p>
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
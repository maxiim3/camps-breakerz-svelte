<script>
    import EnhancedImage from '../atoms/enhanced-image.svelte'
    import HeaderTitle from '../atoms/header-title.svelte'
    import GoFundMeWidget from '../organisms/go-fund-me-widget.svelte'
</script>

<section
    id="food-access"
    class="bg-base-300/90 relative min-h-screen pt-20 pb-32 backdrop-blur-sm"
>
    <div class="container mx-auto">
        <HeaderTitle
            marginBottom="MD"
            alignCenter={true}
            level={2}
            colorContext="dark"
        >
            Food Access Initiative
        </HeaderTitle>
        <div class="relative flex w-full flex-col items-stretch justify-center md:flex-row">
            <div
                class="prose flex max-w-[65ch] min-w-[30h] flex-1 flex-col gap-4 text-pretty text-white"
            >
                <p>
                    Welcome to the Et’aam Food Aid Initiative - a community project initiated by the
                    Camps Breakers Crew & Breakdance School.
                </p>

                <p>
                    While teaching children the art of breakdancing is our passion, CB Crew’s
                    ultimate focus is the wellbeing of the entire community.
                </p>

                <p>
                    Several months ago, the Crew began providing free meals to a few families in
                    need. Soon after, demand flourished and in response to that need we launched the
                    Et’aam Food Aid Campaign (formerly CB Crew Food Access Initiative), aimed at
                    raising funds to make a bigger impact within the community.
                </p>

                <p>
                    The word “Et’aam” (pronounced ‘it-AHM’) signifies a deep commitment to feeding
                    those in need. It perfectly encapsulates our mission to nourish and support
                    Palestinians, particularly those facing extreme financial hardship and
                    displacement in the Gaza Strip. Through our initiative, we strive to embody the
                    values of our name by making a consistent and lasting impact in the lives of
                    others, providing nutrition and resources to as many families as we can.
                </p>

                <p>
                    Et’aam currently distributes food in both Nuseirat Camp and Deir Al Balah. Our
                    dedicated ground teams provide groceries to 25 families each week, filled with
                    everything from lifesaving dry goods to rare, nutritious vegetables.
                </p>

                <p>
                    With food prices soaring due to scarcity, heightened demand, supply chain issues
                    and blockade delays, access to essential nutrition has become a challenge for
                    every individual in Gaza. Through our combined efforts, we can fulfill our
                    mission providing nourishment and support to community members in need.
                </p>

                <p>
                    We invite you to follow along with our journey and dedicated team members via
                    our Instagram fundraising page - @etaamfoodaid / @cbcrewlt. If you’d like to
                    learn more about our dance crew and the children we mentor, you can find us on
                    our main page - @campsbreakerz.
                </p>

                <p>
                    Thank you for your attention, empathy and contribution! Together, we can make a
                    difference in the lives of deserving, vulnerable families.
                </p>

                <div class="my-8 flex flex-col gap-1 sm:flex-row">
                    <a
                        href="https://www.gofundme.com/f/basketsforgaza/donate?source=btn_donate"
                        class="btn btn-warning mx-auto w-full flex-1 text-center"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Donate
                    </a>
                    <a
                        href="https://www.gofundme.com/f/basketsforgaza"
                        class="btn btn-link mx-auto w-full flex-1 text-center"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit the Go Fund Me page
                    </a>
                </div>

                <div class="align-center flex flex-wrap items-center gap-2">
                    {#each {length: 6}, index}
                        {@const videoIndex = index + 1}
                        <div class="aspect-square w-1/3 flex-grow overflow-hidden">
                            <EnhancedImage
                                class="w-full object-cover"
                                src={`/images/food_access_initiative/food_access_initiative_0${videoIndex}.webp`}
                                alt=""
                            />
                            <!-- quality="40" -->
                        </div>
                    {/each}
                </div>
            </div>

            <div class="relative flex-grow-0">
                <GoFundMeWidget />
            </div>
        </div>
    </div>
</section>

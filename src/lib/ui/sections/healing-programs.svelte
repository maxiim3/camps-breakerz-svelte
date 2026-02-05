<script>
    import HeaderTitle from '../atoms/header-title.svelte'
</script>

<section
    id="healing-programs"
    class="bg-base-300/90 relative min-h-screen pt-20 pb-32 backdrop-blur-sm"
>
    <div class="container mx-auto">
        <HeaderTitle
            marginBottom="MD"
            alignCenter={true}
            level={2}
            colorContext="dark"
        >
            Support Healing Through Art
        </HeaderTitle>
        <div class="relative flex w-full flex-col items-stretch justify-center md:flex-row">
            <div
                class="prose flex max-w-[65ch] min-w-[30h] flex-1 flex-col gap-4 text-pretty text-white"
            >
                <div class="overflow-hidden rounded-lg">
                    <img
                        src="/images/healing_programs/healing_programs_hero.webp"
                        alt="Collage of Camps Breakerz healing programs showing children in art therapy, dance, and creative activities"
                        class="w-full object-cover"
                    />
                </div>

                <p>
                    Currently, our focus is on empowering our students to excel in dance and embrace
                    their artistic creativity. We are passionate about providing them with the tools
                    and support they need to heal from trauma and thrive. We're excited to expand
                    and enrich our programs, but there remains a pressing need for essential
                    supplies, healthy snacks, and dance gear for our wonderful students.
                </p>

                <p>
                    With adequate funding, we can strengthen our specialized programs focused on
                    somatic release, coping skills, and emotional support. These initiatives play a
                    crucial role in helping children restore their sense of well-being and
                    belonging, making a lasting impact on their lives.
                </p>

                <p>
                    Our committed team, equipped with backgrounds in psychology and art therapy, is
                    dedicated to providing holistic support to our community. We truly believe in
                    the transformative power of the performing arts and their ability to foster
                    healing and personal growth. Dance is not just an art form; it's a pathway to
                    emotional resilience and connection.
                </p>

                <p>
                    Thank you for your empathy and potential contribution. We invite you to consider
                    joining our community of compassionate supporters by signing up for our monthly
                    donation subscription! Your contribution will have a profound impact, enabling
                    us to create positive change. Together, we can make a meaningful difference in
                    the lives of our deserving students.
                </p>
            </div>
        </div>
        <div class="mt-12 flex justify-center">
            <a
                href="https://gofund.me/3799cb423"
                class="btn btn-warning btn-lg w-full max-w-md text-center text-lg"
                target="_blank"
                rel="noopener noreferrer"
            >
                Donate Now
            </a>
        </div>
    </div>
</section>

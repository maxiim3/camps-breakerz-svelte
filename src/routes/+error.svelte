<script lang="ts">
    import {page} from '$app/stores'
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white">
    <h1 class="text-warning mb-2 text-8xl font-bold">{$page.status}</h1>
    <p class="mb-8 text-xl text-stone-400">
        {$page.error?.message ?? 'Something went wrong'}
    </p>
    <a
        href="/"
        class="btn btn-warning btn-lg">Back to Home</a
    >
</div>

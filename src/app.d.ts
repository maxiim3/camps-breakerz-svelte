// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace Vue {
		export interface PageSection {
			label: string;
			id: string;
		}

		export type TPage = {
			pageTitle: string;
			pageSubTitle?: string;
			pageUrl: string;
		};

		export type availableLogos = 'facebook' | 'youtube' | 'instagram' | 'gmail' | '#';

		export interface SocialMedia {
			label: string;
			url: string;
			logo: availableLogos;
		}

		export interface TeamMember {
			name: string;
			socialMedias: SocialMedia[];
			role: string;
			image: string;
		}

		export type ListItem = {
			id: string;
			label: string;
		};
	}
}

export {};

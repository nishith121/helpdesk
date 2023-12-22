import { computed, ComputedRef } from "vue";
import { defineStore } from "pinia";
import { createListResource } from "frappe-ui";

type TicketCategory = {
	name: string;
	description: string;
	category_name: string;
};

export const useTicketCategoryStore = defineStore("ticketCategory", () => {
	const d__ = createListResource({
		doctype: "HD Ticket Category",
		fields: ["*"],
		auto: true,
		pageLength: 99999,
	});

	const options: ComputedRef<Array<TicketCategory>> = computed(
		() => d__.list?.data || []
	);
	const dropdown = computed(() =>
		options.value.map((o) => ({
			label: o.name,
			value: o.name,
		}))
	);

	return {
		dropdown,
		options,
	};
});

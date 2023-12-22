import { computed, ComputedRef } from "vue";
import { defineStore } from "pinia";
import { createListResource } from "frappe-ui";

type TicketSubcategory = {
	name: string;
	description: string;
	subcategory_name: string;
	category: string;
};

export const useTicketSubcategoryStore = defineStore("ticketSubcategory", () => {
	const d__ = createListResource({
		doctype: "HD Ticket Subcategory",
		fields: ["*"],
		auto: true,
		pageLength: 99999,
	});

	const options: ComputedRef<Array<TicketSubcategory>> = computed(
		() => d__.list?.data || []
	);
	const dropdown = computed(() => (selectedCategory) =>
		options.value.filter((option) => option.category === selectedCategory).map((o) => ({
			label: o.name,
			value: o.name,
		}))
	);

	return {
		dropdown,
		options,
	};
});

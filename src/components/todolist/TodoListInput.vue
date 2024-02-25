<script setup lang="ts">
import { ref, defineEmits, defineProps, watch, computed } from "vue";
import type { NewItemTodo } from "@/types/todoItem";

const emit = defineEmits<{
  (e: "addNewItem", item: NewItemTodo): void;
  (e: "updateItem", item: NewItemTodo): void;
}>();

const props = defineProps<{
  editableItem: NewItemTodo;
}>();

watch(
  () => props.editableItem,
  (newEditableItem, oldEditableItem) => {
    if (
      props.editableItem.edited === true &&
      newEditableItem !== oldEditableItem
    ) {
      libelle.value = props.editableItem.libelle;
    }
  }
);

const libelle = ref("");

const handleSubmit = () => {
  if (libelle.value === "") {
    return;
  }

  if (props.editableItem.edited === true) {
    const editedItem: NewItemTodo = {
      id: props.editableItem.id,
      libelle: capitalizeFirstChart(libelle.value),
      checked: props.editableItem.checked,
      edited: false,
    };
    emit("updateItem", editedItem);
  } else {
    const newItem: NewItemTodo = {
      id: Math.random(),
      libelle: capitalizeFirstChart(libelle.value),
      checked: false,
      edited: false,
    };
    emit("addNewItem", newItem);
  }
  resetForm();
};

const resetForm = () => {
  libelle.value = "";
};

const btnLabel = computed(() => {
  return props.editableItem.edited === true ? "Edit" : "Add";
});

const btnPlaceHolder = computed(() => {
  return props.editableItem.edited === true
    ? "Edit a task..."
    : "Add a task...";
});

const capitalizeFirstChart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex group relative">
    <input
      v-model="libelle"
      type="text"
      :placeholder="btnPlaceHolder"
      class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 mr-2 ring-1 ring-slate-200 shadow-sm"
    />
    <button
      type="submit"
      class="hover:bg-orange-500 group flex items-center rounded-md bg-orange-600 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
    >
      <svg
        v-if="editableItem.edited === true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="mr-1 w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
      <svg v-else width="20" height="20" fill="currentColor" aria-hidden="true">
        <path
          d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"
        />
      </svg>
      {{ btnLabel }}
    </button>
  </form>
</template>

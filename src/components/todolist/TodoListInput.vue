<template>
  <form @submit.prevent="handleSubmit" class="flex group relative">
    <input
      v-model="libelle"
      type="text"
      :placeholder="btnPlaceHolder"
      class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 mr-2 ring-1 ring-slate-200 shadow-sm"
    />
    <button
      v-if="editableItem.edited === true"
      @click="handleCancel"
      class="hover:bg-red-500 group flex items-center rounded-md bg-red-600 text-white text-sm font-medium px-2 mr-1 shadow-sm"
    >
      <IconCancel />
    </button>

    <button
      type="submit"
      class="hover:bg-orange-500 group flex items-center rounded-md bg-orange-600 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
    >
      <IconAdd v-if="!editableItem.edited" />
      {{ btnLabel }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch, computed } from "vue";
import type { NewItemTodo } from "@/types/todoItem";
import IconCancel from "../icons/IconCancel.vue";
import IconAdd from "../icons/IconAdd.vue";

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

const handleCancel = () => {
  const editedItem: NewItemTodo = {
    id: props.editableItem.id,
    libelle: props.editableItem.libelle,
    checked: props.editableItem.checked,
    edited: false,
  };
  emit("updateItem", editedItem);
  resetForm();
};
const btnLabel = computed(() => {
  return props.editableItem.edited === true ? "SAVE" : "ADD";
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

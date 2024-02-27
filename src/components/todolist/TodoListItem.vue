<template>
  <li class="py-4 flex items-center justify-between">
    <div class="flex items-center">
      <input
        v-if="item.edited === false"
        :value="item.checked"
        v-model="checkedItem"
        :true-value="true"
        :false-value="false"
        @change="handleChecked"
        type="checkbox"
        :id="item.id"
        class="checked:bg-gray-500 mr-2"
        :class="{ 'accent-slate-400': item.checked === true }"
      />
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="gray"
        class="w-5 h-6 mr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>

      <p
        class="text-xl font-medium text-gray-900"
        :class="{ 'line-through text-slate-400': item.checked === true }"
      >
        {{ item.libelle }}
      </p>
    </div>
    <div class="flex">
      <button
        @click="editItem"
        class="hover:bg-none group flex items-center rounded-md bg-none px-1 py-1 mr-2 shadow-sm"
        :class="
          item.checked === true
            ? 'bg-slate-200 pointer-events-none cursor-not-allowed'
            : 'bg-white'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="gray"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button
        @click="deleteItem"
        class="hover:bg-none group flex items-center rounded-md bg-none px-1 py-1 shadow-sm"
        :class="
          item.checked === true || item.edited === true
            ? 'bg-slate-200 pointer-events-none'
            : 'bg-white'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="red"
          class="w-4 h-4 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import type { NewItemTodo } from "@/types/todoItem";

const emit = defineEmits<{
  (e: "deleteItem", item: NewItemTodo): void;
  (e: "handleChecked", checkedItem: NewItemTodo): void;
  (e: "editItem", item: NewItemTodo): void;
}>();

const props = defineProps(["item"]);

const checkedItem = ref(false);

const deleteItem = () => {
  console.log("deleteItem before checkedItem : ", checkedItem.value);
  emit("deleteItem", props.item);
  console.log("deleteItem after checkedItem : ", checkedItem.value);
};

const handleChecked = () => {
  emit("handleChecked", { ...props.item, checked: checkedItem });
};

const editItem = () => {
  emit("editItem", { ...props.item, edited: true });
};
</script>

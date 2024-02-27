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
        class="checked:bg-gray-500 mr-2 cursor-pointer"
        :class="{ 'accent-slate-400': item.checked === true }"
      />

      <IconArrowRight v-else />

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
        <IconEdit />
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
        <IconDelete />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import type { NewItemTodo } from "@/types/todoItem";
import IconEdit from "../icons/IconEdit.vue";
import IconDelete from "../icons/IconDelete.vue";
import IconArrowRight from "../icons/IconArrowRight.vue";

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

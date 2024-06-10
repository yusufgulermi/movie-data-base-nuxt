<template>
  <div class="w-full my-[10px]">
    <Popover v-slot="{ open }">
      <PopoverButton
        :class="open ? 'text-white' : 'text-white/90'"
        id="headlessui-popover-button-1"
        class="w-full group flex gap-1 items-center rounded-md bg-[#553986] px-3 py-1 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        <div class="flex flex-col w-[90%]">
          <div class="flex justify-between">
            <span>To:</span>
            <span id="start-date">{{ format(selected.start, 'dd-MM-yyyy') }}</span>
          </div>
          <div class="flex justify-between">
            <span>From:</span>
            <span id="end-date">{{ format(selected.end, 'dd-MM-yyyy') }}</span>
          </div>
      </div>
      </PopoverButton>
        <PopoverPanel v-slot="{ close }">
            <DatePicker class="!absolute z-50" v-model="selected" @close="close"/>
        </PopoverPanel>
    </Popover>
  </div>
</template>

<script setup>
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
    import DatePicker from '../components/DatePicker';
    import { sub, format } from 'date-fns'
  
    const selected = reactive({ 
        start: sub(new Date(), { years: 100 }),
        end: new Date(),
    });
</script>

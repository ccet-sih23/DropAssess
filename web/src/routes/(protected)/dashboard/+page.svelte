<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import {page} from "$app/stores"
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';

  export const BarData = {
  labels: ['math course', 'science course', 'history course', 'hindi course', 'punjabi course', 'finearts course'],
  datasets: [
    {
      title: "Teacher's Data",
      label: '% of dropouts',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 134,159,0.4)',
        'rgba(98,  182, 239,0.4)',
        'rgba(255, 218, 128,0.4)',
        'rgba(113, 205, 205,0.4)',
        'rgba(170, 128, 252,0.4)',
        'rgba(255, 177, 101,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)',
        'rgba(98,  182, 239, 1)',
        'rgba(255, 218, 128, 1)',
        'rgba(113, 205, 205, 1)',
        'rgba(170, 128, 252, 1)',
        'rgba(255, 177, 101, 1)',
      ],
    },
  ],
};

export const CasteBarData = {
  labels: ['sc', 'st', 'obc', 'gen', 'nri'],
  datasets: [
    {
      title: "Teacher's Data",
      label: '% of dropouts',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 134,159,0.4)',
        'rgba(98,  182, 239,0.4)',
        'rgba(255, 218, 128,0.4)',
        'rgba(113, 205, 205,0.4)',
        'rgba(170, 128, 252,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)',
        'rgba(98,  182, 239, 1)',
        'rgba(255, 218, 128, 1)',
        'rgba(113, 205, 205, 1)',
        'rgba(170, 128, 252, 1)',
      ],
    },
  ],
};
export const GenderBarData = {
  labels: ['10-12', '12-16', '16-18'],
  datasets: [
    {
      title: "Teacher's Data",
      label: '% of dropouts',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 134,159,0.4)',
        'rgba(98,  182, 239,0.4)',
        'rgba(255, 218, 128,0.4)',
        'rgba(113, 205, 205,0.4)',
        'rgba(170, 128, 252,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)',
        'rgba(98,  182, 239, 1)',
        'rgba(255, 218, 128, 1)',
        'rgba(113, 205, 205, 1)',
        'rgba(170, 128, 252, 1)',
      ],
    },
  ],
};
export const StandardBarData = {
  labels: ['female', 'male', 'other'],
  datasets: [
    {
      title: "Teacher's Data",
      label: '% of dropouts',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 134,159,0.4)',
        'rgba(98,  182, 239,0.4)',
        'rgba(255, 218, 128,0.4)',
        'rgba(113, 205, 205,0.4)',
        'rgba(170, 128, 252,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)',
        'rgba(98,  182, 239, 1)',
        'rgba(255, 218, 128, 1)',
        'rgba(113, 205, 205, 1)',
        'rgba(170, 128, 252, 1)',
      ],
    },
  ],
};
Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );
</script>

{#if $page.data.user.userType === 'teacher'}
  <h1>
    Hi, {$page.data.user.name}
  </h1>
  <Bar data={BarData} options={{ responsive: true }} />
{:else if $page.data.user.userType === 'student'}
<div class="flex flex-col gap-4">
  <h1>
    Hi, {$page.data.user.name}
  </h1>
    You are currently <strong>under formal education</strong>
  </div>
  {:else if $page.data.user.userType === 'none'}
  <div class="flex flex-col gap-4">
    <h1>
      Hi, {$page.data.user.name}
    </h1>
    Please wait for your local admin to assign you a role
  </div>
  {:else if $page.data.user.userType === 'dropped'}
  <div class="flex flex-col gap-4">
    <h1>
      Hi, {$page.data.user.name}
    </h1>
    You are currently <strong>not under formal education</strong>

    You are recommended a course in commerce
  </div>
  {:else if $page.data.user.userType === 'schoolAdmin'}
  <div class="flex flex-col gap-4">
    <h1>
      Hi, {$page.data.user.name}
    </h1>
    A dashboard here to update student data for this school
  </div>
  {:else if $page.data.user.userType === 'govtOff'}
  <div class="flex flex-col gap-4">
    <h1>
      Hi, {$page.data.user.name}
    </h1>
    <div class="flex w-full">
      <div class="w-1/2">
        <h2>
          Caste dropout data
        </h2>
        <Bar data={CasteBarData} options={{ responsive: true }} />
      </div>
      <div class="w-1/2">
        <h2>
          Sex based dropout data
        </h2>
        <Bar data={GenderBarData} options={{ responsive: true }} />
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/2">
        <h2>
          Standard dropout data
        </h2>
        <Bar data={StandardBarData} options={{ responsive: true }} />
      </div>
    </div>
  </div>
{/if}


<style lang="postcss">
  section {
    margin-top: 5vh;
  }
</style>
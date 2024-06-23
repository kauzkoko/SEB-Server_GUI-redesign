<template>
  <v-stepper
    class="m-3"
    editable
    :items="[
      'Create or import an exam',
      'Configure the exam',
      'Run and monitor the exam',
      'Analyse exam results',
    ]"
  >
    <template v-slot:item.1>
      <v-card title="Create or import an exam" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>

    <template v-slot:item.2>
      <v-card title="Configure Exam" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>

    <template v-slot:item.3>
      <v-card title="Monitor Exam" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>

    <template v-slot:item.4>
      <v-card title="Analyse exam results" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>
  </v-stepper>
</template>

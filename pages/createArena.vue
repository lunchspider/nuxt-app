<template>
  <div>
    <v-container fluid fill-height align="center">
      <v-card class="elevation-12" width="80%" height="100%" v-if="stage === 1">
        <template v-slot:title>
          <h2>General Infomation</h2>
        </template>
        <v-card-text
          >Customers will be only seeing your exact address while they're
          booking.</v-card-text
        >
        <form ref="form" @submit.prevent="stage++">
          <v-text-field
            v-model="clubName"
            name="Club Name"
            label="Club Name"
            type="text"
            required
          />
          <v-select
            v-model="country"
            :items="countires"
            item-title="name"
            item-value="isoCode"
            label="Country"
            required
            return-object
          />
          <v-select
            v-model="city"
            :items="cities"
            item-title="name"
            item-value="name"
            label="City"
            required
            return-object
          />
          <v-btn color="blue" type="submit" class="mt-4">Continue</v-btn>
        </form>
      </v-card>
      <v-card v-if="stage === 2" class="elevation-12" width="80%" height="100%">
        <v-card-title><h2>Enter your location</h2></v-card-title>
        <GMapMap
          :center="{ lat: lat, lng: lng }"
          :zoom="7"
          map-type-id="terrain"
          style="width: 40vw; height: 400px"
        >
        </GMapMap>
        <v-row>
          <v-col>
            <v-btn color="red" @click="stage--">Back</v-btn>
          </v-col>
          <v-col>
            <v-btn color="blue" @click="stage++">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="stage === 3" class="elevation-12" width="50%" height="100%">
        <v-card-title><h2>Opening Hours</h2></v-card-title>
        <v-card-text>Show your working schedule to your customers</v-card-text>
        <div v-if="!customizeTime">
          <v-row>
            <v-col>
              <v-label>From</v-label>
              <input
                :value="schedule[0].start"
                @input="(event) => handleStartChange(event.target.value)"
                type="time"
              />
            </v-col>
            <v-col>
              <v-label>To&nbsp; &nbsp; &nbsp;</v-label>
              <input
                :value="schedule[0].end"
                @input="(event) => handleEndChange(event.target.value)"
                type="time"
              />
            </v-col>
            <v-col>
              <v-label
                @click="customizeTime = !customizeTime"
                style="color: blue"
                >Customize Time</v-label
              >
            </v-col>
          </v-row>
        </div>
        <div v-if="customizeTime">
          <v-container v-for="(day, index) in weekdays">
            <v-row>
              <v-col>
                <v-switch
                  v-bind:label="day"
                  color="blue"
                  v-model="schedule[index].toggle"
                />
              </v-col>
              <v-col>
                <v-label>From</v-label>
                <input type="time" :value="schedule[index].start" />
              </v-col>
              <v-col>
                <v-label>To</v-label>
                <input type="time" :value="schedule[index].end" />
              </v-col>
            </v-row>
          </v-container>
          <v-label @click="customizeTime = !customizeTime" style="color: blue"
            >To default value</v-label
          >
        </div>
        <v-row>
          <v-col>
            <v-btn color="red" @click="stage--">Back</v-btn>
          </v-col>
          <v-col>
            <v-btn color="blue" @click="stage++">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="stage === 4" width = "90%">
        <v-card-title><h2>Create Court</h2></v-card-title>
        <v-card-text
          >Add courts so your customer could book and play</v-card-text
        >
        <v-card width="30%" >
          <v-card-text>Indoor courts</v-card-text>
          <form ref = "form">
            <v-text-field
              v-model = "indoorCourtsNumber"
              label = "How many?"
              required
              ></v-text-field>
          </form>
        </v-card>
        <v-card width="30%" >
          <v-card-text>Outdoor courts</v-card-text>
          <form ref = "form">
            <v-text-field
              v-model = "outdoorCourtsNumber"
              label = "How many?"
              required
              ></v-text-field>
          </form>
        </v-card>
        <v-row>
          <v-col>
            <v-btn color="red" @click="stage--">Back</v-btn>
          </v-col>
          <v-col>
            <v-btn color="blue" @click="stage++; handleCourts()">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if = "stage === 5" width = "90%">
        <v-card-title><h2>Contact Information</h2></v-card-title>
        <v-card-text>Please verify the following information is correct and that the description is</v-card-text>
        <form ref = "form">
          <v-text-field 
              v-model = "website"
              name = "website" 
              label = "Website" 
              type = "text" 
              required></v-text-field>
          <v-text-field 
              v-model = "phone"
              name = "phone" 
              label = "Phone" 
              type = "tel" 
              required></v-text-field>
          <v-textarea
              v-model = "description"
              name = "description" 
              label = "Description" 
              type = "text" 
              required></v-textarea>
        </form>
        <v-btn color="red" @click="stage--">Back</v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { Country, City, ICountry, ICity } from "country-state-city";

interface Schedule {
  day: number;
  start: string;
  end: string;
  toggle: boolean;
}

interface ICourt{
  courtType : string;
  courtNumber : number;
}


let clubName = ref("");
let country = ref(Country.getCountryByCode("IN")!);
let city = ref({
  name: "Amalner",
  countryCode: "IN",
  stateCode: "MH",
  latitude: "21.03983000",
  longitude: "75.05887000",
} as ICity);
let lng = ref(0);
let lat = ref(0);
watch(city, () => {
  // user picked the city
  lng.value = city.value.longitude;
  lat.value = city.value.latitude;
});
let countires = ref(Country.getAllCountries());
let cities = ref(City.getCitiesOfCountry(country.value.isoCode));
const onCountryChange = () => {
  cities.value = City.getCitiesOfCountry(country.value.isoCode);
};
watch(country, () => onCountryChange());
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let stage = ref(1);
let schedule = reactive([] as Schedule[]);
for (let i = 0; i < 7; i++) {
  schedule.push({ day: i, start: "09:00", end: "17:00", toggle: true });
}

const handleStartChange = (value: string) => {
  if (value == "") return;
  for (let i = 0; i < 7; i++) {
    schedule[i].start = value;
  }
};

const handleEndChange = (value: string) => {
  for (let i = 0; i < 7; i++) {
    schedule[i].end = value;
  }
};
let customizeTime = ref(false);

let indoorCourtsNumber = ref(1);
let outdoorCourtsNumber = ref(1);

let courts = reactive([] as ICourt[]);

const handleCourts = () => {
  let courtNumber = 1;
  courts = [];
  for(let i = 0 ; i < indoorCourtsNumber.value ; i++){
    courts.push({ courtType: "indoor", courtNumber : courtNumber + 1});
    courtNumber = courtNumber + 1;
  }
  for(let i = 0 ; i < outdoorCourtsNumber.value ; i++){
    courts.push({ courtType: "outdoor", courtNumber : courtNumber + 1});
    courtNumber = courtNumber + 1;
  }
}

let website = ref("");
let phone = ref("");
let description = ref("");


const handleSubmit = async () => {};
</script>

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';
import VueClipboard from 'vue-clipboard2';
import '@mdi/font/css/materialdesignicons.css'
import { settingsKey } from '@/constants.js'

// if the darkmode needs to be determined from settings
const settingsStr = localStorage.getItem(settingsKey)
const darkMode = settingsStr && JSON.parse(settingsStr).darkMode // default false

Vue.use(Vuetify, {
    directives: {
      Touch
    }
});
Vue.use(VueClipboard);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#C63100',
                accent: '#EF5100',
                highlight: '#FFF176', // yellow lighten-2
                star: '#F9A825', // yellow darken 3
                linkColor: '#0000FF',
            },
            dark: {
                primary: '#FF8A65', // deeporange lighten 2
                info: '#4FC3F7', // lightblue ligten 2
                highlight: '#4527A0', // deep-purple darken-3 (green/red/purple colors are good)
                star: '#FFD600', // yellow accent 4
                linkColor: '#0000FF',
            },
        },
        dark: darkMode, // from localStorage
        options: {
            customProperties: true, // generates css variables to use in style blocks
        },
    },
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    }
});

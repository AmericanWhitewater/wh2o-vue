import Vuex from "vuex";
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Contact from "@/js/components/main/auth/contact.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

const successMessage = "this is a success message";
const contactText = "this is some contact message";
const globalLanguage = "en";

const store = new Vuex.Store({
  state: {
    Global: {
      language: globalLanguage
    },
    Theme: {
      theme: {
        themeStrings: {
          en: {
            auth_contact_text: contactText,
            auth_contact_success_text: successMessage
          }
        }
      }
    }
  }
});

const wrapper = shallowMount(Contact, {
  store,
  localVue,
  stubs: {
    RouterLink: RouterLinkStub
  }
});

describe("Contact.vue", () => {
  it("Renders 'auth_contact_text'", () => {
    expect(wrapper.find("p").text()).toBe(contactText);
  });

  it("Links to Login page.", () => {
    expect(wrapper.find("#login").props().to).toBe("/login");
  });

  it("Links to Request Access page.", () => {
    expect(wrapper.find("#request-access").props().to).toBe("/request-access");
  });

  it("Shows success message.", () => {
    wrapper.setData({ success: true });
    expect(wrapper.find(".success-text").text()).toBe(successMessage);
  });
});

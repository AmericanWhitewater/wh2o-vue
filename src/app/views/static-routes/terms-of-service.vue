<template>
  <div class="terms-of-service">
    <layout
      id="general-statement"
      :name="hideSidebar ? 'layout-full-width' : 'layout-two-thirds'"
    >
      <template #main>
        <template v-if="!hideTitle">
          <hr>
          <h1 class="mb-spacing-md">
            Terms of Service
          </h1>
          <h5 class="mb-md">
            Effective 03-01-2019
          </h5>
        </template>
        <section class="mb-md">
          <h2 class="mb-spacing-md">
            General Statement
          </h2>
          <p>
            American Whitewater (AW) fully respects your right to privacy. We
            collect information that you voluntarily provide, such as when you
            send us an email message or submit information through one of our
            on-line forms. We only use this information in accordance with the
            purpose for which you provided it. In particular, AW will not share
            your email address with any third party.
            <br><br>
            With the exception of the technical information described below, we
            do not collect any information about you on this website unless you
            voluntarily provide it.
          </p>
        </section>
        <section
          id="info-collection"
          class="mb-md"
        >
          <h2 class="mb-spacing-md">
            Collection and use of Technical Information
          </h2>
          <p>
            This website uses cookies that enable your web browser to remember
            which pages you have already visited.
            <br><br>
            Most of this site will function properly using a browser that has
            cookies disabled. However, pages that require visitors to log-in may
            not work with cookies disabled.
            <br><br>
            For statistical purposes AW collects technical information on
            visitors to this website. This technical information collection
            captures the following types of information:
            <br><br>
          </p>
          <cv-list>
            <cv-list-item>
              The IP address of a visitor’s web server.
            </cv-list-item>
            <cv-list-item>
              The visitor’s top-level domain (for example .com, .org,
              .net).
            </cv-list-item>
            <cv-list-item>
              The website address from which each visitor came to this site,
              including any search terms used to find this site.
            </cv-list-item>
            <cv-list-item>
              The type of web browser used by each website
              visitor.
            </cv-list-item>
          </cv-list>
        </section>
        <section
          id="credit-card-security"
          class="mb-md"
        >
          <h2 class="mb-spacing-md">
            Credit Card Security
          </h2>
          <p>
            AW takes the security of our members transactions very seriously, utilizing internet encryption and authentication technology and protocols to safeguard the privacy, confidentiality, and security of your information. All your order information is always protected by SSL (Secure Socket Layer) encryption, the industry standard for online transactions. We do not store credit card numbers on our server as per the PCI guidelines.
          </p>
        </section>
        <section
          id="privacy"
          class="mb-md"
        >
          <h2 class="mb-spacing-md">
            Privacy
          </h2>
          <p class="mb-spacing-md">
            Because American Whitewater places the highest importance on respecting and protecting your privacy, we would like to share our privacy statement with you. This statement applies to all communication channels American Whitewater uses online or offline, and covers members, donors, subscribers to our online newsletter and website users. We value our relationship with you and want you to feel confident when using our web site and entrusting your personal information to us.
          </p>
          <cv-list class="mb-spacing-md">
            <cv-list-item>We will not sell, share, or rent your email/mail address with anyone outside of American Whitewater.</cv-list-item>
            <cv-list-item>We will not sell, share, or rent your phone number with anyone outside of American Whitewater.</cv-list-item>
            <cv-list-item>We will not sell, share, or rent your physical address with anyone outside of American Whitewater.</cv-list-item>
            <cv-list-item>We will not share your membership status with anyone outside of American Whitewater.</cv-list-item>
          </cv-list>
          <p>
            We value our relationship with you and want you to feel confident when using our web site and entrusting your personal information to us. We do not sell your information to third parties because we hate junk mail, too.
          </p>
        </section>
        <section
          id="content"
          class="mb-md"
        >
          <h2 class="mb-spacing-md">
            User Contributions and Site Content
          </h2>
          <p>
            The content on this site, including user-submitted content is publicly available for personal, non-commercial reference use only. Data may be cited and used by the terms defined within US Copyright Code.
            <br><br>
            User-submitted data is provided voluntarily and without compensation. American Whitewater reserves the right to revise, paraphrase, delete, archive data and may use user-provided data to promote or benefit the organization. Users agree that all content submitted is original work.
          </p>
        </section>
        <section
          id="data-harvesting"
          class="mb-md"
        >
          <h2 class="mb-spacing-md">
            Data Harvesting
          </h2>
          <p>
            Harvesting any information or data from the American Whitewater website is strictly prohibited, regardless of its intended use or method of retrieval. This includes personal use as well. All reproduction, including mass reproduction, data harvesting, crawling, indexing, use of automated retrieval systems, or commercial or personal reproduction of content in whole or in part on the American Whitewater's site and affiliate sites is prohibited.
          </p>
        </section>
        <section
          id="data-harvesting"
          class="mb-xl"
        >
          <h2 class="mb-spacing-md">
            API Access
          </h2>
          <p>
            American Whitewater does not provide an API for access to our river data. We don't intend to add an API to access our data in the future.
          </p>
        </section>
      </template>

      <template
        v-if="!hideSidebar"
        #sidebar
      >
        <cv-list class="sticky">
          <cv-list-item>
            <a href="#general-statement">General Statement</a>
          </cv-list-item>
          <cv-list-item>
            <a
              href="#info-collection"
            >Collection and use of Technical Information</a>
          </cv-list-item>
          <cv-list-item>
            <a href="#credit-card-security">Credit Card Security</a>
          </cv-list-item>
          <cv-list-item>
            <a href="#privacy">Privacy</a>
          </cv-list-item>
          <cv-list-item>
            <a href="#content">User Contributions and Site Content</a>
          </cv-list-item>
          <cv-list-item>
            <a href="#data-harvesting">Data Harvesting</a>
          </cv-list-item>
          <cv-list-item>
            <a href="#api-access">API Access</a>
          </cv-list-item>
        </cv-list>
      </template>
    </layout>
  </div>
</template>
<script>
import { Layout } from '@/app/global/layout'
export default {
  name: 'terms-of-service',
  components: {
    Layout
  },
  props: {
    hideSidebar: {
      type: Boolean
    },
    hideTitle: {
      type: Boolean
    }
  }
}
</script>

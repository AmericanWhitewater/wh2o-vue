<template>
  <div class="news-tab">
    <layout name="layout-full-width" class="mb-lg">
      <template #main>
        <hr >
        <h2 class="mb-spacing-md">Alerts</h2>
        <template v-if="user">
          <cv-button
            class="mb-spacing-xl"
            size="small"
            :disabled="alertsLoading"
            @click.exact="initiatePostUpdate()"
            @keydown.enter="initiatePostUpdate()"
          >
            + New Alert
          </cv-button>
        </template>
        <template v-else>
          <login-button buttonClass="mb-spacing-sm" buttonText="Log in to add an alert" />
        </template>
        <template v-if="alertsLoading && !alerts">
          <utility-block
            class="alerts-loading"
            state="loading"
            text="loading alerts"
          />
        </template>
        <template v-else-if="alerts && alerts.length > 0">
          <div class="bx--row">
            <div
              v-for="(alert, index) in alerts"
              :key="index"
              class="bx--col-sm-12 bx--col-lg-8 mb-spacing-md"
            >
              <cv-tile>
                <div class="alert-wrapper">
                  <header class="bx--row">
                    <div class="bx--col-sm-12 bx--col-md-8 mb-spacing-xs">
                      <h4> {{ alert.title }} </h4>
                      <div class="bx--type-caption">
                        {{ formatDate(alert.post_date, "ll") }}
                        <template v-if="alert.user">
                          - {{ alert.user.name }}
                        </template>
                      </div>
                      <hr v-if="!editMode" >
                    </div>
                    <div v-if="editMode" class="bx--col">
                      <cv-button
                        v-if="canEdit(alert)"
                        size="small"
                        kind="secondary"
                        @click.exact="initiatePostUpdate(alert.id)"
                        @keydown.enter="initiatePostUpdate(alert.id)"
                      >
                        Edit
                      </cv-button>
                      <cv-button
                        v-if="canDelete(alert)"
                        size="small"
                        kind="danger"
                        @click.exact="triggerAlertDelete(alert.id)"
                        @keydown.enter="triggerAlertDelete(alert.id)"
                      >
                        Delete
                      </cv-button>
                      <hr v-if="editMode" >
                    </div>
                  </header>
                  <main class="alert-detail">
                    <p v-if="alert.detail" v-text="alert.detail" />
                    <p v-else>This alert has no message</p>
                  </main>
                </div>
              </cv-tile>
            </div>
          </div>
        </template>
        <template v-else>
          <utility-block
            class="alerts-empty"
            state="content"
            text="No alerts"
          />
        </template>
      </template>
    </layout>

    <layout name="layout-full-width">
      <template #main>
        <section class="news-tab">
          <div class="articles">
            <hr >
            <h2 class="mb-spacing-sm">Articles</h2>
            <div v-if="articlesLoading">
              <utility-block
                class="articles-loading"
                state="loading"
                text="loading articles"
              />
            </div>
            <div v-else-if="articles">
              <div class="bx--row">
                <div
                  v-for="(article, index) in articles"
                  :key="index"
                  class="bx--col-sm-12 bx--col-md-8 bx--col-lg-8 bx--col-max-6 mb-spacing-lg"
                >
                  <article-card
                    :article="article"
                  />
                </div>
              </div>
            </div>
            <div v-else>
              <utility-block
                class="articles-empty"
                state="content"
                text="no articles"
              />
            </div>
          </div>
        </section>
      </template>

    </layout>
    <post-update-modal
      :post="activeAlert"
      :visible="postUpdateModalVisible"
      :title="updateModalTitle"
      kind="WARNING"
      :reach-id="$route.params.id"
      @update:submitted="postUpdateModalVisible = false"
      @update:success="handleUpdateSuccess"
      @update:cancelled="postUpdateModalVisible = false"
    >
      <template #form-fields="formData">
        <cv-text-input
          ref="title"
          v-model="formData.formData.title"
          class="mb-spacing-md"
          label="Title"
        />
        <cv-text-area
          v-model="formData.formData.detail"
          label="Message"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
    </post-update-modal>
    <confirm-delete-modal
      ref="confirmDeleteModal"
    />
    <DocumentsInNewsTab/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import { Layout } from "@/app/global/layout";
import {
  ConfirmDeleteModal,
  LoginButton,
  PostUpdateModal,
} from "@/app/global/components";
import { ArticleCard, DocumentsInNewsTab } from "./components"
import { deletePost } from "@/app/services";
export default {
  name: "news-tab",
  components: {
    UtilityBlock,
    Layout,
    LoginButton,
    ArticleCard,
    ConfirmDeleteModal,
    PostUpdateModal,
    DocumentsInNewsTab
  },
  mixins: [objectPermissionsHelpersMixin],
  data: () => ({
    updateModalTitle: "New Alert",
    successToastTitle: "Alert Submitted",
    postUpdateModalVisible: false,
    activeAlertId: "",
  }),
  computed: {
    ...mapState({
      articlesLoading: (state) => state.RiverNews.loading,
      articlesError: (state) => state.RiverNews.error,
      articles: (state) => state.RiverNews.data,
      alertsLoading: (state) => state.RiverAlerts.loading,
      alertsError: (state) => state.RiverAlerts.error,
      alerts: (state) => state.RiverAlerts.data,
      user: (state) => state.User.data,
      editMode: state => state.Global.editMode
    }),
    activeAlert() {
      if (this.activeAlertId) {
        return this.alerts.find((a) => a.id === this.activeAlertId);
      }
      return null;
    },
  },
  methods: {
    initiatePostUpdate(alertId) {
      if (this.user) {
        this.updateModalTitle = alertId ? "Edit Alert" : "New Alert";
        this.successToastTitle = alertId ? "Alert Revised" : "Alert Submitted";
        this.activeAlertId = alertId || null;
        this.postUpdateModalVisible = true;
      }
    },
    async handleUpdateSuccess() {
      this.postUpdateModalVisible = false;
      await this.$store.dispatch("RiverNews/getProperty", this.$route.params.id);
      await this.$store.dispatch("RiverAlerts/getProperty", this.$route.params.id);
      this.$store.dispatch("Global/sendToast", {
        title: this.successToastTitle,
        kind: "success",
        override: true,
        contrast: false,
        action: false,
        autoHide: true,
      });
    },
    getAlert(id) {
      return this.alerts.find(a => a.id === id);
    },
    async triggerAlertDelete(alertId) {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: 'Delete Alert',
        message: `Are you sure you want to delete "${this.getAlert(alertId)?.title || "Untitled Alert"}"?`
      });
      if (ok) {
        this.deleteAlert(alertId);
      }
    },
    async deleteAlert(alertId) {
      try {
        const result = await deletePost(alertId);

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            title: "Alert Deleted",
            kind: "success",
            override: true,
            contrast: false,
            action: false,
            autoHide: true,
          });
          this.$store.dispatch(
            "RiverAlerts/getProperty",
            this.$route.params.id
          );
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
          title: "Delete Failed",
          kind: "error",
          override: true,
          contrast: false,
          action: false,
          autoHide: true,
        });
      }
    }
  },
  created() {
    if (!this.articles) {
        this.$store.dispatch("RiverNews/getProperty", this.$route.params.id);
      }

      if (!this.alerts) {
        this.$store.dispatch("RiverAlerts/getProperty", this.$route.params.id);
      }
  },
};
</script>
<style lang="scss" scoped>
.news-tab {
  padding-top: 2rem;
  .alert-wrapper {
    min-height: 250px;
    height: auto;
    position: relative;
    .alert-detail {
      overflow-y: scroll;
      @include carbon--breakpoint("sm") {
        max-height: 325px;
      }
    }
    footer {
      padding-top: 1rem;
    }
  }
}
</style>

<script setup>
import { useI18n } from 'vue-i18n'
import { Instagram, Linkedin, Youtube, Facebook, Twitter } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__brand">
        <h2 class="footer__logo">VESTA</h2>
        <div class="footer__socials">
          <a href="#" aria-label="Instagram" class="social-link">
            <Instagram :size="20" :stroke-width="2" />
          </a>
          <a href="#" aria-label="LinkedIn" class="social-link">
            <Linkedin :size="20" :stroke-width="2" />
          </a>
          <a href="#" aria-label="YouTube" class="social-link">
            <Youtube :size="20" :stroke-width="2" />
          </a>
          <a href="#" aria-label="Facebook" class="social-link">
            <Facebook :size="20" :stroke-width="2" />
          </a>
          <a href="#" aria-label="Twitter" class="social-link">
            <Twitter :size="20" :stroke-width="2" />
          </a>
        </div>
      </div>

      <nav class="footer__nav">
        <router-link to="#">{{ t('footer.assistance') }}</router-link>
        <router-link to="#">{{ t('footer.company') }}</router-link>
        <router-link to="#">{{ t('footer.partners') }}</router-link>
        <router-link to="#">{{ t('footer.jobs') }}</router-link>
        <router-link to="#">{{ t('footer.press') }}</router-link>
      </nav>

      <nav class="footer__nav footer__nav--legal">
        <router-link to="#">{{ t('footer.privacy') }}</router-link>
        <router-link to="#">{{ t('footer.cookies') }}</router-link>
        <router-link to="#">{{ t('footer.no_share') }}</router-link>
        <router-link to="#">{{ t('footer.terms') }}</router-link>
      </nav>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #e9f0e8;
  padding: $space-xl $space-lg;
  color: $black;

  &__container {
    display: flex;
    flex-direction: column;
    gap: $space-xl;
    max-width: 400px;
  }

  &__logo {
    color: $primary-light;
    font-family: $font-family-title;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    margin-bottom: $space-md;
    letter-spacing: 1px;
  }

  &__socials {
    display: flex;
    gap: $space-md;
    margin-bottom: $space-sm;

    .social-link {
      color: $black;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, color 0.2s;

      &:hover {
        color: $primary-color;
        transform: translateY(-2px);
      }
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-md;

    a {
      font-size: $font-size-base;
      color: $black;
      text-decoration: none;
      font-weight: $font-weight-normal;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }

    &--legal {
      margin-top: $space-sm;
      gap: $space-sm;

      a {
        font-size: $font-size-sm;
      }
    }
  }

  &__auth {
    margin-top: $space-sm;

    .link-login {
      color: $primary-light;
      font-weight: $font-weight-medium;
      text-decoration: none;
      font-size: $font-size-base;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
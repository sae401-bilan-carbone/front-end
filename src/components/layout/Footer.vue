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
        <router-link to="/assistance">Assistance</router-link>
        <router-link to="/entreprise">Entreprise</router-link>
        <router-link to="/partenaires">Centre partenaires</router-link>
        <router-link to="/emplois">Offres d'emploi</router-link>
        <router-link to="/presse">Presse</router-link>
      </nav>

      <nav class="footer__nav footer__nav--legal">
        <router-link to="/confidentialite">Confidentialité</router-link>
        <router-link to="/cookies">Politique d'utilisation des cookies</router-link>
        <router-link to="/donnees">Ne pas partager mes infos personnelles</router-link>
        <router-link to="/cgv">Conditions générales</router-link>
      </nav>

      <div class="footer__auth">
        <router-link to="/login" class="link-login">Se connecter</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Importation des icônes Lucide
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Twitter 
} from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
.footer {
  background-color: $gray-200; // Gris clair du design
  padding: $space-xl $space-lg;
  color: $black;

  &__container {
    display: flex;
    flex-direction: column;
    gap: $space-xl;
    max-width: 400px; // Garde le contenu serré à gauche comme sur l'image
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
      color: $black; // L'icône Lucide hérite de cette couleur
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, color 0.2s ease;

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
      gap: $space-sm; // Espacement plus serré pour les mentions légales
      
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
import * as Keycloak from 'keycloak-js';

export interface User {
  profile: Keycloak.KeycloakProfile;
  jwt?: string;
}

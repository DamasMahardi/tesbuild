import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // http://docs.identityserver.io/en/3.1.0/endpoints/discovery.html
  // https://github.com/manfredsteyer/angular-oauth2-oidc
  // https://developer.okta.com/blog/2017/08/22/build-an-ionic-app-with-user-authentication

  constructor(
    private httpService: HttpService
  ) {

  }

  discovery() {
    return this.httpService.get(`/.well-known/openid-configuration`);
  }

  getTenants() {
    return this.httpService.getTenant(`/api/multi-tenancy/tenants`);
  }

  getTenantByName(tenantName: string) {
    return this.httpService.getTenant(`/api/abp/multi-tenancy/tenants/by-name/${tenantName}`);
  }

  getTenantById(tenantId: string) {
    return this.httpService.getTenant(`/api/abp/multi-tenancy/tenants/by-id/${tenantId}`);
  }

  login(authData: any, tenant: string) {
    return this.httpService.token(authData, tenant);
  }

  getApplicationConfiguration(tenant: string, token: string) {
    return this.httpService.getWithAuth(`/api/abp/application-configuration`, tenant, token);
  }

  getCurrentWithNavigationProperties(id: any, tenant?: string, token?: string) {
    return tenant !== null 
      ? this.httpService.getWithAuth(`/api/employee/current-with-navigation-properties/${id}`, tenant, token)
      : this.httpService.get(`/api/employee/current-with-navigation-properties/${id}`);
  }

  getCurrentEmployeeInformation(id: any, tenant?: string, token?: string) {
    return tenant !== null 
      ? this.httpService.getWithAuth(`/api/employee/current-employee-information/${id}`, tenant, token)
      : this.httpService.get(`/api/employee/current-employee-information/${id}`);
  }

  getUserRoles(id: any) {
    return this.httpService.get(`/api/identity/users/${id}/roles`);
  }

  updateProfileDetail(body: any) {
    return this.httpService.post(`/api/identity/my-profile`, body);
  }

  changePassword(body: any) {
    return this.httpService.post(`/api/identity/my-profile/change-password`, body);
  }

  logout() {
    return this.httpService.get('/api/account/logout');
  }

  getEmployeeLookup() {
    return this.httpService.get('/api/app/employee/lookupList');
  }

  getEmployeeLookupById(id: any) {
    return this.httpService.get(`/api/app/employee/${id}/lookupList`);
  }

  resetPassword(body: any) {
    return this.httpService.post('/api/account/send-password-reset-code', body);
  }
}
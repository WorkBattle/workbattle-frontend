import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable()
export class PublicRouterGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    /**
     * Check if the user isn't logged in before entering route
     */

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedOut()) {
            return true;
        }
        this.router.navigate(['/main']);
        return false;
    }
}

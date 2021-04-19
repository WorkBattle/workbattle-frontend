import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable()
export class PrivateRouterGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    /**
     * Check if the user is logged in before entering route
     */

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}

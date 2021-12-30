import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IMenuItem {
  caption: string;
  link?: string;
  href?: string;
  activated?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) { }

  menu: IMenuItem[] = [
    { caption: "Dark Entity", link: "/" },
    { caption: "Freedom", link: "/freedom" },
    { caption: "Blog", link: "/blog" },
    { caption: "Projects", link: "/projects" },
    { caption: "Heavy Bin", link: "/bin" },
    { caption: "AlternativeX", link: "/alternativex" },
    { caption: "|"  },
    { caption: "Github", href: "https://github.com/ScuroGuardiano" },
    { caption: "Discord", href: "https://discord.gg/vzuHKYg8Ys" }
  ]

  routerSubscription?: Subscription;
  activeMenuItem?: IMenuItem;

  isAnchor(menuItem: IMenuItem) {
    return menuItem.href || menuItem.link;
  }

  isSeparator(menuItem: IMenuItem) {
    return !menuItem.href && !menuItem.link;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(val => val instanceof NavigationEnd)
    ).subscribe(event => {
      const url = (event as NavigationEnd).url;
      const firstUrlSegment = '/' + (url.split('/')[1] ?? ''); // Don't fuckin' ask

      if (this.activeMenuItem?.link === firstUrlSegment) {
        return;
      }

      const menuItem = this.menu.find(mi => mi.link === firstUrlSegment);

      if (this.activeMenuItem?.activated) {
        this.activeMenuItem.activated = false;
      }

      this.activeMenuItem = menuItem;
      if (this.activeMenuItem) {
        this.activeMenuItem.activated = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
  }

}

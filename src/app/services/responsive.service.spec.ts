import { BreakpointObserver } from "@angular/cdk/layout"
import { inject, signal } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { ResponsiveService } from "./responsive.service"
import { toSignal } from "@angular/core/rxjs-interop"

xdescribe('ResponsiveService', () => {
    let responsiveService: ResponsiveService
    let breakPointObserver: BreakpointObserver

    beforeEach(() => {
        TestBed.configureTestingModule({
        })

        responsiveService = TestBed.inject(ResponsiveService)
        breakPointObserver = TestBed.inject(BreakpointObserver)
    })

    // it('should smallScreen false', () => {
    //     expect(responsiveService.smallScreen()).toBeFalsy()
    // })

})
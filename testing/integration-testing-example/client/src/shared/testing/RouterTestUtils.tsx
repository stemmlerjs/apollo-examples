
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

export class RouterTestUtils {

  public static renderWithRouter (ui: any, { route = '/', pageName = 'Test page' } = {}) {
    window.history.pushState({}, pageName, route)
  
    return { 
      component: render(ui, { wrapper: BrowserRouter }), 
      router: window.history 
    }
  }

  public static wasRouteCalled (routerSpy: jest.SpyInstance<void, [data: any, title: string, url?: string | null | undefined]>, route: string) {
    const callsJSON = JSON.stringify(routerSpy.mock.calls);
    const containsRoute =  callsJSON.indexOf(route) !== -1;
    return containsRoute;
  }

}


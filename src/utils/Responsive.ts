export class Responsive {
    static readonly responsiveMediaQueries: { [key: string]: string } = {
        extralarge: "(min-width: 2501px)",
        large: "(max-width: 1700px)",
        medium: "(max-width: 1300px)",
        mobile: "(max-width: 850px)",
        tiny: "(max-width: 450px)",
    } as const;

    private responsiveSizes: { [key: string]: boolean } = {};

    public static Instantiate() {
        return new Responsive();
    }

    addResponsiveSizeListeners() {
        Object.keys(Responsive.responsiveMediaQueries).forEach(size => {
            const mediaQuery = window.matchMedia(Responsive.responsiveMediaQueries[size])

            // add listener for media query change
            mediaQuery.addEventListener("change", (e) => this.handleQueryChange(e, size))

            // make initial check for media query
            this.handleInitalQueryCheck(mediaQuery, size);
        })
    }

    private handleInitalQueryCheck(query: MediaQueryList, size: string) {
        this.responsiveSizes[`r-${size}`] = query.matches;
        this.updateHTMLClass();
    }

    private handleQueryChange(e: MediaQueryListEvent, size: string) {
        this.responsiveSizes[`r-${size}`] = e.matches;
        this.updateHTMLClass();
    }

    /**
     * update <html> class with responsive size classes to reflect current size of the screen
     */
    private updateHTMLClass() {
        document.documentElement.className = Object.keys(this.responsiveSizes).filter(size => this.responsiveSizes[size]).join(" ");
    }
}
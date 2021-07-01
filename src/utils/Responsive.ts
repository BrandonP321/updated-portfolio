type ResponsiveSize = "massive" | "extralarge" | "large" | "medium" | "mobile" | "tiny";

class ResponsiveMediaQuery {
    public name: ResponsiveSize;
    public query: string;

    constructor(name: ResponsiveSize, query: string) {
        this.name = name;
        this.query = query;
    }

    test() {
        const mm = window.matchMedia(this.query);
        return mm.matches;
    }

    createMatchMedia() {
        return window.matchMedia(this.query);
    }
}

class ResponsiveInternal {
    private _massive = new ResponsiveMediaQuery("massive", "screen and (min-width: 2500px)");
    private _extraLarge = new ResponsiveMediaQuery("extralarge", "screen and (max-width: 1600px)");
    private _large = new ResponsiveMediaQuery("large", "screen and (max-width: 1300px)");
    private _medium = new ResponsiveMediaQuery("medium", "screen and (max-width: 1000px)");
    private _mobile = new ResponsiveMediaQuery("mobile", "screen and (max-width: 800px)");
    private _tiny = new ResponsiveMediaQuery("tiny", "screen and (max-width: 450px)");

    get massive() { return this._massive.test() };
    get extraLarge() { return this._extraLarge.test() };
    get large() { return this._large.test() };
    get medium() { return this._medium.test() };
    get mobile() { return this._mobile.test() };
    get tiny() { return this._tiny.test() };

    private responsiveSizes: { [key: string]: boolean } = {};
    private mediaQueries: ResponsiveMediaQuery[] = []

    constructor() {
        this.mediaQueries = [
            this._massive,
            this._extraLarge,
            this._large,
            this._medium,
            this._mobile,
            this._tiny
        ]
    }

    public static Instance() {
        return new ResponsiveInternal();
    }

    addResponsiveSizeListeners() {
        this.mediaQueries.forEach(query => {
            const mediaQuery = query.createMatchMedia();
            mediaQuery.addEventListener("change", (e) => this.handleQueryChange(e, query.name))
            this.handleInitalQueryCheck(mediaQuery, query.name)
        })
    }

    private handleInitalQueryCheck(query: MediaQueryList, size: ResponsiveSize) {
        this.responsiveSizes[`r-${size}`] = query.matches;
        this.updateHTMLClass();
    }

    private handleQueryChange(e: MediaQueryListEvent, size: ResponsiveSize) {
        this.responsiveSizes[`r-${size}`] = e.matches;
        this.updateHTMLClass();
    }

    /**
     * update <html> class with responsive size classes to reflect current size of the screen
     */
    private updateHTMLClass() {
        // document.documentElement.className = Object.keys(this.responsiveSizes).filter(size => this.responsiveSizes[size]).join(" ");
        Object.keys(this.responsiveSizes).forEach(size => {
            const doesQueryMatch = this.responsiveSizes[size];
            const htmlEle = document.documentElement;
            // check if <html> has class for this specific size
            const htmlEleHasSizeClass = htmlEle.classList.contains(size)

            if (doesQueryMatch && !htmlEleHasSizeClass) {
                console.log("adding class")
                htmlEle.classList.add(size)
            } else if (!doesQueryMatch && htmlEleHasSizeClass) {
                htmlEle.classList.remove(size);
            }
        })
    }
}

export const Responsive = ResponsiveInternal.Instance();
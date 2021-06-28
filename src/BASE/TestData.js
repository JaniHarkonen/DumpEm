/*

    In order to avoid testing with Electron, this file will contain data for components. 

*/

export var jNotesInA = 
{
    class: "note",
    attributes: {
        id: "not",
        isRendered: true,
        hostComponent: "A",
        font: "Courier New",
        fontSize: "14px",
        content: "* INFLATION *\n\
        - 0.3% increase in FINLAND\n\
        - -0.3% decrease in EUROZONE\n\
        \n\
        - supported by:\n\
            -- cigarettes\n\
            -- detached houses\n\
            -- telecommunication services\n\
            -- research and healthcare\n\
        - dragged by:\n\
            -- motor fuel\n\
            -- hotel rooms\n\
            \n\
            \n\
        * HOUSING *\n\
        - building permits fell 11.3% in Q3, however square meters for residential\n\
          construction climbed 12.5%, while non-residential square meters fell\n\
          21.3% due to a 35.5% decline in business and office construction\n\
          \n\
          -> rich people potentially buying houses for remote work as well as\n\
             consolidating market returns\n\
             \n\
        - permits falling, however started projects rising\n\
          -> construction likely delayed due to corona\n\
        - effects of coronavirus have been limited\n\
        - home building increased unexpectedly\n\
        - business premises building continues low\n\
            -> office building negatively impacted by corona due to remote work\n\
            -> warehouse building positively impacted due to increased online shopping\n\
            \n\
            \n\
        * PULP MARKET *\n\
        - price down 40% from ATH by the end of 2019, due to slowing growth across\n\
          the globe, particularly in CHINA\n\
        - 37% of FINNISH pulp production exported to CHINA\n\
        - CHINESE digitalisation may drag prices due to falling demand for paper\n\
        - in the long run emphasis will be on recyclable pulp\n\
        - pulp demand has been stable in EUROPE, however inventories small\n\
        - demand has increased in CHINA along with ASIAN prices\n\
        - some rebound in price in december 2020, however reversal seems likely\n\
        - CORONA affects supply chain, however effects are likely temporary while\n\
          effects on demand may linger resulting in oversupply\n\
        - the environmental push results in more deman for paper-based packaging\n\
        \n\
        \n\
        * STEEL *\n\
        - price rising due stronger than expected CHINESE GDP\n\
        - CHINA one of the major consumers of steel -> high impact on price of iron\n\
          ore -> high impact on steel\n\
        - less driving affects the price of steel as less cars produced\n\
        - price of oil correlates highly with steel, low price typically considered\n\
          good\n\
        - scrap metal price high due to lower steel demand leading to less scrap\n\
          metal and residue being produced as a by-product\n\
        - components: iron ore, coking coal and scrap metal\n\
        - price of oil is recovering leading to lower profit margins for steel\n\
          producers\n\
        - joe biden may reduce/lift tariffs regarding steel leading to prices rising\n\
          outside of US, thus far only US steel is going to benefit while EU prices\n\
          being held down\n\
        - EU continues measures against cheap CHINESE steel prices\n\
        \n\
        \n\
        * OIL *\n\
        - oil price recovering\n\
        - OPEC as well as non-OPEC compliance nearly 100%\n\
        \n\
        * CHIP SHORTAGE *\n\
        - investment in foundaries required to produce chips has fallen\n\
        - work at home increases demand for devices and cloud computing\n\
        - automotive segment hit the most due to \n\"just in time\n\" supply chain\n\
            -> chips are brought in factory just in time before being used\n\
            -> supply chain highly suseptible to disruptions\n\
            -> car makers have had to significantly slow down production due to\n\
               not being able to obtain chips\n\
        - water shortage in taiwan -> chip production requires huge amounts of water\n\
          daily\n\
          \n\
        * BASE MATERIAL SHORTAGE *\n\
        - increasing inflation plays a hand (people consuming more due to having more money)\n\
        - green legislation as a means of infaltion control? explore this\n\
        - production was cut back in the beginning of the pandemic resulting in\n\
          shortages as demand recovered\n\
            -> price of plastic high -> lower profit margins for converters\n\
        - metals increasing in prices due to anti-dumping measures by EU set to last 5 years\n\
          and lockdowns in areas with high metal exports\n\
        - container shortages though this is rapidly easing\n\
        \n\
        \n\
        * CORONAVIRUS *\n\
        - threats:\n\
            -- new variants with higher infection rate and no less severe\n\
               symptoms\n\
            -- new variants immune to existing vaccinations\n\
            -- markets not accounting for third wave\n\
            -- if the lockdowns are not lifted, populism resulting in\n\
               further market instability\n\
               \n\
        - positive:\n\
            -- most likely to mutate towards a less severe variant\n\
            -- vaccinations seem to function as intended, so far no side-\n\
               effects\n\
            -- large companies taking market share from smaller ones\n\
               -> large public companies can grow at a higher-than-usual\n\
                  rate\n\
            -- potentially higher energy consumption due to remote work,\n\
               however most likely more than offset by reduced factory\n\
               activity\n\
            -- hospitlaizations as well as deaths down, icu spot usage\n\
               significantly lower than expected"
    }
}

export var jWorkspaceA =
{
    class: "workspace",
    attributes: {
        id: "A",
        isRendered: true,
        name: "xD",
        components: [jNotesInA],
        hostComponent: "ROOT"
    }
};

export var jSymbolListInB = 
{
    class: "symbol-list",
    attributes: {
        id: "symbols",
        isRendered: true,
        hostComponent: "ROOT",
        symbolData: [
            {
                title: "BTC/USD",
                ticker: "COINBASE:BTCUSD",
                tradingViewLink: "https://www.tradingview.com/chart/?symbol=COINBASE%3ABTCUSD"
            },
            {
                title: "ETH/USD",
                ticker: "COINBASE:ETHUSD",
                tradingViewLink: "https://www.tradingview.com/chart/?symbol=COINBASE%3AETHUSD"
            }
        ]
    }
};

export var jWorkspaceB =
{
    class: "workspace",
    attributes: {
        id: "B",
        isRendered: true,
        name: "dd",
        hostComponent: "ROOT",
        components: [jSymbolListInB]
    }
}

export var jTabbedViewerInROOT =
{
    class: "viewer-tabbed",
    attributes: {
        id: "viewer",
        isRendered: true,
        activeTab: 0,
        hostComponent: "ROOT",
        workspaces: [jWorkspaceA.attributes.id, jWorkspaceB.attributes.id]
    }
}

export var jROOT = 
{
    id: "ROOT",
    class: "workspace",
    name: "ROOT",
    isRendered: true,
    hostReference: null,
    components: [jWorkspaceA, jWorkspaceB, jTabbedViewerInROOT],
    options: ["add", "delete"],
    scripts: {
        init: "testInit"
    }
};
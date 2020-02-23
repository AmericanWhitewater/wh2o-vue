# Main Tab Services

Fetch relevant data for the river detail main tab.

## Available GraphQL Queries

```
type Reach
{
	id: Int
	river: String
	section: String
	altname: String
	county: String
	zipcode: String
	length: Float
	avggradient: Int
	maxgradient: Int
	agency: String
	gaugeinfo: String
	description: String
	photoid: Int
	permitid: Int
	huc: String
	plat: Float
	plon: Float
	prrn: String
	tlat: Float
	tlon: Float
	trrn: String
	skid: Int
	status: String
	edited: DateTime
	is_final: Boolean
	revision: Int
	class: String
	ploc: String
	tloc: String
	was_final: Boolean
	thumboverride: Boolean
	shuttledetails: String
	abstract: String
	direction_default: Int
	custom_destination: String
	revision_comment: String
	permiturl: String
	permitinfo: String
	image_override: String
	geom: String
	readingsummary: ReadingSummary
	revisions: [Reach!]! @hasMany(type:"paginator")
	states: [State!]! @hasMany
	reachstates: [State!]! @hasMany
	posts(post_type: [PostType!] @in): [Post]!  @hasMany(type: "paginator")
	rapids: [Rapid] @hasMany
	photos: [Photo!]! @hasMany(type: "paginator")
	accidents: [Accident!]! @hasMany(type: "paginator")
	photo: Photo #photo on banner of river
}

```

## Example Query

The following query is called by the main river detail component. On initial load, the user only needs to see the info displayed above the fold
so we make the core data call first. We can then load the remaining sections afterwards.

```
const fetchRiverDetailData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
             river,
             section,
             length,
             avggradient,
             maxgradient,
             description,
             edited,
             class,
             plat,
             plon,
             geom,
             photo {
               url
             }
        }
    }
    
    `
    })
    .then(res => res.data)
}
```
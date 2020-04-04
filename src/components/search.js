import React from 'react'
import "../search.css"
import axios from 'axios'

class Search extends React.Component {

    constructor(props){
        super(props)
            this.state = {
                query: '',
                results: {},
                loading: false,
                message: ''
            }
        this.cancel= '';
    }

    inputChange = (event) => {
        const query = event.target.value;
        this.setState({
            query: query,
            loading: true,
            message: ""
        }, () => {
            this.fetchResults(query);
        })
        
    }

    fetchResults = ( query ) => {
        const searchUrl = `https://itunes.apple.com/search?term=${query}`
        axios.get( searchUrl)
        .then(res=>{
            const resultNotFoundMsg = ! res.data.results.length ? 'There are no search results for this query' : ''
            this.setState({
                results: res.data.results,
                message: resultNotFoundMsg,
                loading: false
            }, () => {
                console.log(this.state)
            })
        })
    }

    renderSearchResults = () => {
        const {results} = this.state
        if ( Object.keys( results ).length && results.length){
            return(
                <div className="">
                    <br />
                    <h4>Total no of results: {results.length}</h4>
                    <br></br>
                 <table className="table table-striped">
                     <tr>
                         <th>Artist Name</th>
                         <th>Release Date</th>
                         <th>Track Name</th>
                         <th>Track Count</th>
                         <th>Primary GenreName</th>
                         <th>ArtistID</th>
                         <th>Collection Name</th>
                         <th>Track Price</th>
                     </tr>
                    { results.map( result => {
                        return (
                        <tr>
                            <td>{result.artistName}</td>
                        <td>{result.releaseDate}</td>
                            <td>{result.trackName}</td>
                        <td>{result.trackCount}</td>
                        <td>{result.primaryGenreName}</td>
                        <td>{result.artistId}</td>
                            <td>{result.collectionName}</td>
                        <td>{result.trackPrice}</td>
                        </tr>     
                        )
                    })
                    }
                    </table>
                </div>
            )
        }
        else{
            return(
                <div>
                <br></br>
                <h4>No search results found for this query</h4>
                </div>
            )
        }
    }

    render(){
        const {query} = this.state;

        return(
            

             <div className="containe">
                 <h2 className="headin">iTunes Search Api</h2>
                 <label className="modi">
                   <input 
                     type="text"
                     name="query"
                     value={query}
                     id='mod'
                     size="50"
                     placeholder="Search for artist"
                     onChange={this.inputChange}
                     />
                   <i class="fa fa-search mat" aria-hidden="true" />
                 </label>
                 {this.renderSearchResults()}
             </div>
        )
    }
}

export default Search
export default function Search(props){
    
    return(
        <div >
            <form >               
                    <input 
                      type="search" 
                      name="searchQuery"
                      id="serachBar"
                      placeholder="search post by title"
                      value={props.searchQuery}
                      onChange={(e) => {props.setSearchQuery(e.target.value)}}  />               
            </form>
        </div>
    )
}
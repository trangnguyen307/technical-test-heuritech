import '../App.css';

const genderOptions = [
    { value: "female", name: "Female" },
    { value: "male", name: "Male" }
];
const geozoneOptions = [
    { value: "eu", name: "Europe" },
    { value: "us", name: "United State" },
    { value: "jp", name: "Japan" },
    { value: "br", name: "Brazil" },
    { value: "cn", name: "China" }
];
const sortByOptions = [
    { value: "growth", name: "Descending" }
];

function Header(props) {
    const onChangeFilter = (event) => {
        const { name, value } = event.target;
        if (value) {
            props.updateState({ [name]: value, pageSize: 20 })
        }
    }
    return (
        <div className='header'>
            <h1>Trend list</h1>
            <div className='filter'>
                <div>
                    <select name="gender" id="gender" onChange={e => onChangeFilter(e)}>
                        <option value="">Gender</option>
                        {
                            genderOptions.map(el => <option key={el.value} value={el.value}>{el.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <select name="geozone" id="geozone" onChange={e => onChangeFilter(e)}>
                        <option value="">Zone</option>
                        {
                            geozoneOptions.map(el => <option key={el.value} value={el.value}>{el.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <select name="sortBy" id="sortBy" onChange={e => onChangeFilter(e)}>
                        <option value="">Sort</option>
                        {
                            sortByOptions.map(el => <option key={el.value} value={el.value}>{el.name}</option>)
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Header;

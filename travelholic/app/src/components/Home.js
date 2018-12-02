import React, {Component} from "react";
import axios from "axios";
import AutoSuggestTextbox from "./AutoSuggestTextbox";
import Grid from '@material-ui/core/Grid';
import RecipeReviewCard from "./ResultCard";

class Home extends Component {

    constructor() {
        super();
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history.location.search) {
            var search = nextProps.history.location.search;
            search = search.substring(1);
            //var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            // this.setState({activeTab: parseInt(searchObj.year)});
            // this.setState({selectedYear: searchObj.year});
            // this.setState({selectedMonth: searchObj.month});
            this.getData(this);
        } else {
            this.getData(this);
        }
    }

    componentDidMount() {
        this.getData(this);
    }

    handleSelect(selectedTab) {
        // this.setState({
        //     activeTab: selectedTab,
        //     selectedYear: selectedTab
        // });
    }

    getData(ev) {
        axios.get('http://localhost:8080/api/group/findAll')
            .then(function (response) {
                console.log(response.data);
                ev.setState({data: response.data});
                // ev.setState({selectedYear: parseInt(year)});
                // ev.setState({selectedMonth: month});
            });
    }

    renderResultInCard() {
        return (
            <div className="card">
                {
                    this.state.data.map((grp) => {
                        return (
                            <Grid container direction="row" justify="center" spacing={24}>
                                <Grid item xs={12}>
                                    <RecipeReviewCard avatar="R"
                                                      title={grp.name}
                                                      subheader={grp.city}
                                                      description={grp.country}
                                                      paragraph1={grp.id}
                                                      paragraph2={grp.id}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </div>);
    }

    render() {
        return (
            <div>
                <h2>Result</h2>
                <div className="row">
                    <div className="col">
                        1 of 3
                    </div>
                    <div className="col-6">
                        2 of 3 (wider)
                    </div>
                    <div className="col">
                        3 of 3
                    </div>
                </div>
                <div className="row">
                    <AutoSuggestTextbox/>
                </div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs>
                            ABC
                        </Grid>
                        <Grid item xs>
                            ABC
                        </Grid>
                        <Grid item xs>
                            ABC
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs>
                            ABC
                        </Grid>
                        <Grid item xs={6}>
                            ABC
                        </Grid>
                        <Grid item xs>
                            ABC
                        </Grid>
                    </Grid>
                </div>

                {this.renderResultInCard()}
            </div>
        );
    }
}

export default Home;
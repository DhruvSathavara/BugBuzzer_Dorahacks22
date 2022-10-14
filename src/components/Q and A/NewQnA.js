

import axios from "axios";
import { useMoralisQuery } from "react-moralis";
import React, { useEffect, useState } from "react";


function NewQA() {


    const { data, fetch } = useMoralisQuery("QuestionModal");
    const [questionList, setQuestionList] = useState([]);


    useEffect(() => {
        const Qlist = JSON.parse(JSON.stringify(data));
        if (Qlist) {
            ListQuestions(Qlist)
        }
    }, [data])

    async function ListQuestions(Qlist) {
        var array = [];
        if (Qlist) {
            for (let index = 0; index < Qlist.length; index++) {
                const element = Qlist[index];
                if (element.CID) {

                    await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then(async (response) => {
                        const id = element.objectId;
                        var newData = { ...response.data, id, element }
                        array.push(newData)
                    })
                }
            }
        }
        setQuestionList(array);
    }


    return (
        <div class="accordion w-100" id="basicAccordion">


            {questionList && questionList.map((qList) => {

                return (
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button collapsed" type="button" data-mdb-toggle="collapse"
                                data-mdb-target="#basicAccordionCollapseOne" aria-expanded="false" aria-controls="collapseOne">
                               {qList.que}
                            </button>
                        </h2>

                    </div>
                )
            })}







        </div>
    )
}




export default NewQA;
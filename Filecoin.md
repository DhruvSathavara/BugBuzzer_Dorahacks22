## IPFS & Filecoin

https://github.com/DhruvSathavara/Untouce-code-HackFS/blob/master/src/Context/BookContext.js
https://github.com/DhruvSathavara/Untouce-code-HackFS/blob/master/src/components/UploadForm.js


### Bookcontex.js

```
  function addData(Item) {
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "data.json"),
        ];
        return files;

    }
    async function storeFiles(Item) {
        var array = [];

        // TO GET CURRENT USER WALLET ADDRESS
        let currentUser = login()
        const Cuser = Moralis.User.current(currentUser)
        UntoucheDdata.set("Current_User", user)


        let files = addData(Item)
        const cid = await client.put(files);
        UntoucheDdata.set("CID", cid);
        UntoucheDdata.save();
        axios.get(`https://${cid}.ipfs.infura-ipfs.io/data.json`)
            .then(function (response) {
                array.push(response.data);
                setData(array);
            })
            .catch(function (error) {
            })

        return cid;
    }

```

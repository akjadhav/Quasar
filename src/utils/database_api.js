import { auth, database } from '../utils/firebase'

const putItem = (name, id, imsrc, modsrc, modIosSrc, price, desc) => {
    const updates = {
        name: name,
        img_src: imsrc,
        mod_src: modsrc,
        mod_ios_src: modIosSrc,
        price: price,
        desc: desc
    }

    const unsubscribe = database
        .ref('items/'+ id)
        .set(updates);
        return unsubscribe
}

export { putItem }
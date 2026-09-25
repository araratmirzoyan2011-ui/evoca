import React, { useState, useEffect } from 'react';

const faceImages = [
  "https://th.bing.com/th?q=Model+Face&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-WW&cc=AM&setlang=ru&adlt=moderate&t=1&mw=247",
  "https://www.bing.com/th/id/OIP.AQtvP5FcfiEMQpu14ueJCgHaGU?w=193&h=165&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=ImgAns&rm=2","data:image/webp;base64,UklGRmgMAABXRUJQVlA4IFwMAAAQTACdASrdAOoAPp1KoEulpCMnpXM6YPATiWduul6FViykvd+SaVkKL4bqZPIWHDzngQ/dt9UT6dPOLuKeCIw/zuU+2zRe9g1J8abF2eYYLREG/U7M38h7kihWCgjJ0dhDrat+RGFchacEEqeJi6JyhUjRWS2EvRnCG45Rb1WvoEJ8temPA/aktnoO/Yx0xpVuWGc2gt/2eity5hf4rmw06sfcnAWUi/sWL+17jI26+J+MI1SIwDgRJjDEk/xTw19aKfZDpqkhRvkh88AZ0xYKMVlvfLcsWhGE9UVbx7jcTPyq8JQQ2ZLqKALHSR9Gq1T3veHaHoKlWZBgcnhpfVtuy+na30acV+p1mGfCNxzStejf7muBNTugpVTclln7HzIhVa8bS6XoQlTDR3fDzzY26MaOLbgLR8KhtTJj57kQ3lthdYm+7LFgWKbvb0qtCr/KkH/ohjxqW8LL9XdDbBhCnzEgTiJdq2964RqzRF6JAmAHkZdz7ltVN/U8W+gTp5RnSLKD4eVclum3v+3Qh8yba0l4rpwc79ms7kyE90YJ9jORaDRFy+7spwWwm4JGgKtZZ23zFVeDsOVYy/a9oCcpFwjvM4yn3nV6Hdu0vMAWQcXkF75/ty2mmnRHNFCQHFmQAfH8axwB1J5eMUWRQ1ZVne/mi9W2PfTdUHmXyOWnL8edzML86PfUcLLdxvmNGc0h4afZyT5dYgRnCZXlYSaja3X0sx+VGMLwjXFQzLU+HXhi5+WLidzeKcU8ZQCUCXYtXDrQuSUnrZP6XCyJZ/dsDTArkv1zzwtakM2CkBdoygKLmg6xB9XgAAD++GrFUI/OlWNw9cP56+2Fx+AQxNMgkqah0E+EozylYN96zswxVGvsj/DyxfFC0Ic1klBC/usrPZRjgwiemicnAMzNt3yv822t7Qma275CpJunZflRT1t/zM/6n+cW5nbnUDn5ZLh7XU72z/H71UwL21aYDAjCs+k6Q+QOzmvHI6V3nslTaHB3wDtj5lsQ8WIqIYdz9m8QWBhgE2I9yXEfv8M6EoTP+MkA3g6jJEECAlASD8gABDO3227alHu5C606DcZ56gyr2JO8tE9kNPaPxI0w4JE8ybbGU4ZT+7B9Dg5PFl35Z8FLEOUKlhQNB7+BKj8nGJx7rxZXoKBIdv3VbdfEsiS4CjU9b3c+lS56zplik5VCGuDFFjDbLMISXZNN2Ja7OjkPfVU25udd0UPNze0JYsJIUgev+Svzun82Tzk/cD47YwbWQzNfHlEr0NNPpxOnMb0RZG2FOLOtL1Kk/1j7njESx7cZ+3ivhVDj/qqi5xBabtLMFHWUTguQ9bE0DJfOAw9ZCLiCkQm9cHJ3/BEgynznsUij2Q5sPaIF/1X/MwAdgTpSCryaf8vzlqlzc1mWBCCb7cBrrAtDd+T4clKEb+2G4iPWRlhisHIDRcD6ATu/noAfOP9YWVuDIyrRD+JPVcjnv1++8BGrsasbHqtdi+d4aLyNqQD9+/pJW7fhjbpb1RUT6xopU69lA3uPByZQRqV7jzIaxjjm/NMnYZXxqcqDOxEauKoFh9/6dRs/snbIbr9Ip1fnAIDaaXNkQMu8rR3HojyfiYXid3qF2WXpuaLqJSXi/mAf/QwR29rbApOU0Q6pHTAjU+TvWeN/RhVwW/7N0kCgkjSa3iFVikL0R2t9ZMc1+/TI0/7lPQVWeNG7iu2DN9jR/Cc605u/27EvSCvRxPf7L5LvTpiqw4VzJRTVuAFgqngUwbsDh/hfmSv1NUYwukxIahpKl/Ist4mrKtd8+E9a+8vKos7pSfsCIbshv05RyBEwrq6A5op3thStogErmwnCTBGwcRlJjK/tWT2RKbgBLA4zM3Lgx4pOXf3CTTfxrNOE56XmlpYqOGbHed2PIaeIZp4poPL/Ct7AKQynCj4B3sl8MI/5CU+xxmYnLbvLaSaahUSs+rMF5m33wp2mL1T0h4YnSUvtFDIc/xVBObNAfqNuHSiGalajO88gpva6IU1eKvY318sWQqJ6aBYUBsQx1aAf1BU9MTQrC1du9GbTtaptC79WjU97ormDPUiv15R5kEElHSr6lQ2eqRdf5+puOnAKpvwjIdTj4xz+NmkHoqsMc0GqxmW6hebiBt/VC6kuHpr3lDdNv4D/+LrAHG5qnafZRsZDtHDyrhEPoe3FhgXnQeVY0qwUYH9H5TekfCEMbCXfWOzy5dAxB+3wOv/ak0rNOwKSIB5SjevFR9ZzB73iFfc9qkYerqpem83cjcuQE5tDP3Umi8/FreKvGV23YCHp60wx9gS2bplA/+xPVFyXBKDkgvqNfUz2D2Nv5PGAh+ug8jXQazaoSIooJvJQcIlkM2xGNEp7zrs10jm4Vtr/OOro8S5nigwwO2gSd4bl40Wq2zNjviPyyfKIkhOaTMNVcdCKEIY/5BQ43Pkld2Y8lZkVI1xd/6jcydBD5t1R7ScFKAS172uSQBvmcbtGDxqO8yUcE1ZFw4ixXFnMzgu8OnQSXuFZcalJDO7TPHTyKttxHTOsL1Z0YOnoDc3UvPsj12BaqkrXcIWTospRqg4DljyGRQHHJHSyAaT8KhhA8enctkgHEF2vXPDxRDdbzCC4duHfTWsI7/bDZ9Sv4a+5Qr5klRVUGnjIcUvJk5O5+Xi3NIIRH6/T6J+aBcrclr1E8hd7h6inmOe7NlSLSrxJifjbfOUNJ8uc4MCeIsbe1n8WYmWemJMWZXRHe932KAh7DapqpY4Hu6oIgySjTOjukpWev8LtvsRdOSrE51d8KxwjXLLwbQFXpfeWVTMfHlVE0D8y0Lcs1woWgFJBj7YeVmbyotN+smkiZFMEsuXuLX35CjGKPZ5kfu0EPFZri/ABv3ym88jy7LzDU5vctXxdHSFp2LTIDLeG/4k4+0WFroenuApohbQzwk0IOFsCpYL4qpFs3jGnjzGcIRC0VF/TskSuLgBrIKyyHqzgAeEANozyI5vqBAEoxkMkzVZ+2ph0nR9exZlq874Qw+niG9ykW/VDev841gLGq5Fx0zK1imjlHtl2xLFwjPdIlwDUX5RIXNLD+MbQT7LXEiMrKnABdGLXNpZGSimZwqivNgfwQonf2en/tC1jMI1jubR/nvNodDMvLH+uxnBDHfF2NMAvGyjmJMUflWOZY+1mayIHSu07LM6AhnNH+Fjmeiwcb9PjGn9uRlV71WCcgAB7EIZBcJSgxl4IgYyr998vbBKlwZUUD40JFzkL360qD4oSL8i4rBN4GNd4nG1RslEyGZqLtBrgBVkMuZXSEef+dooOxewQQW+gG21RrWmhErHxmdkkXXz2Uwz4RALUc6G8fm9DY6OWEVu9x60JNXLR394+EkhdSsbjEfDwAfMody0gZPSikw0p8sbyWLij+yuBhzHqRupBKWVvn3V2QuRyybkUVEt8yENXyx6WX2NDCdPlcJ0W8QqvqR/0reVwU+k+nnpbsWjrXzQKXGwNZ89TbGncX15T4I6Wq9FPrL6o4ZsYQ4qb7TyAaawRJfno9v3jtWeA/ScHxk31FxTVadkO2osllYRD4BJHSAJmI1MkbnZICJWGdhcHlPbbJHzdyTAgem22IcckLwnbyXFzaf+pXwQE1Eapq2fuSfJDVcBEzFbeOUzruncjJ+S8Z469qCtgdHvGEObywaJ4Hna8Z+ArH3VcArKGK26T8LjbEwQoMiq4HgZO/Ps4V2V8yoKQfCbrCEsAymjJ0L0H0Gr6b+gDf1RvYR3J9cAkZDBuEah95p7mMdC77kf1fRO0RcXYKzvaUvVJbtUgUxqyAYBlroZQaK2Y3GYmyJGLioKT6GLcDmr812X0YfqtYoSaRlwpsWJGdIP8x9Kw26F4F13Y2grYga5wERfTSlYmSkvTdsEA9Jx7rV6BPhdDthRqZv+Du2yCT2PuxF5YMiHgtojbeG8EYo3oHkbghAzZOTpDwE5ZEXQmyUkepDR6SEmUoDojagtirJfok0H7iImzQe2KZlI3DUhq+mlTOUf4euaGwYQr1zjL8DIN38Prr3vdcctv2hGDyqx9P0Q4RJddGkTSH6H9w93AWzlNi/48fk5ibRqnJedvmG2XjHAD5g7HSxRL/LbMzjzbXdpzmQvWMtH//63Rw9zM5HlHG9QEWZVJL89BGnlxyuTvywYO8UTiFe57/R+YnSvfLc85rakhQEnDyIpzlycA22lETesXlkRVCMAhtkbXxbxNjAAAAA=="
];

export function BiometricFace() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % faceImages.length);
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[500px] md:h-[500px] mx-auto">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="outerTriangleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.1,0 L 0.9,0 Q 1,0 0.95528,0.08944 L 0.54472,0.91056 Q 0.5,1 0.45528,0.91056 L 0.04472,0.08944 Q 0,0 0.1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-800"
        style={{ clipPath: 'url(#outerTriangleClip)' }}
      />

      <div className="absolute top-[14%] left-[30%] w-[40%] h-[40%] overflow-hidden rounded-full border-2 sm:border-4 border-white shadow-lg">
        <img
          src={faceImages[index]}
          alt="face scan"
          className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}
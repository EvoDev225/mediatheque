import { useState } from "react";
import { EnvoyerCode } from "../Utilisateur/Utilisateur";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  
  // Objet qui stocke le code
  const [data, setData] = useState({
    code: ""
  });

  const handleChange = (value, index) => {
    if (value.length > 1) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Mettre à jour l’objet automatiquement
    setData({
      code: newInputs.join("")
    });
  };

  const handleCode = (e) => {
    e.preventDefault();
    try {
      const res = EnvoyerCode(data); // on envoie l’objet ici
      console.log("OBJET ENVOYÉ :", data);
      if(res){
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" w-full flex items-center justify-center min-h-screen">
        <div className="p-10 border-t-4 min-w-5xl rounded-xl  border-orange-500 shadow-2xl">
          <form onSubmit={handleCode}>
            <div className="text-center font-bold text-4xl">
              Entrez le code
            </div>

            <div className=" w-full flex items-center justify-center my-10 gap-12">
              {inputs.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  min={0}
                  max={9}
                  value={val}
                  onChange={e => handleChange(e.target.value, i)}
                  className=" w-20 h-20 border-4 border-violet-500 rounded-xl text-center outline-none"
                />
              ))}
            </div>

            <div className="w-full flex justify-center items-center">
              <input
                type="submit"
                value={"Confirmer"}
                className="w-1/2 py-2 cursor-pointer duration-100 hover:scale-95 rounded-lg font-bold text-xl bg-orange-500 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;

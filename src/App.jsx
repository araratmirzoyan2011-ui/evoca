import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Evoca-main";
import Busines from "./Pages/business-loans";
import Instant from "./Pages/instant-payments";
import About from "./Pages/about";
import Structure from "./Pages/structure";
import Managment from "./Pages/management";
import Sarheholder from "./Pages/shareholders";
import Parthner from "./Pages/partners";
import Group from "./Pages/evoca-group";
import Departments from "./Pages/departments";
import Csr from "./Pages/csr";
import News from "./Pages/news";
import Blog from "./Pages/blog";
import Career from "./Pages/career";
import Plus from "./Pages/plus";
import EvocaWork from "./Pages/evocawork";
import Answer from "./Pages/answers";
import Work2 from "./Pages/evokawork2"
import Intership from "./Pages/internship";
import Bridge from "./Pages/bridge";
import FinReports from "./Pages/financial-reports";
import Reports from "./Pages/reports";
import InvestReports from "./Pages/investors";
import SemReports from "./Pages/semiannual-report";
import AnualReports from "./Pages/annual-report";
import Laws from "./Pages/laws";
import Bulders from "./Pages/builders";
import Property from "./Pages/property";
import Dealers from "./Pages/dealers";
import Archive from "./Pages/archive";
import Cardholders from "./Pages/cardholders";
import Rights from "./Pages/rights";
import Criteria from "./Pages/criteria";
import Regulation from "./Pages/regulation";
import Ombudsman from "./Pages/ombudsman";
import Tariif from "./Pages/tariffs";
import LegalLoans from "./Pages/legal-loans";
import IndividualLoans from "./Pages/individual-loans";
import Deposits from "./Pages/deposits";
import Privacy from "./Pages/privacy";
import Loans from "./Pages/loans";
import CreditLoans from "./Pages/credit-history";
import DepositMain from "./Pages/depositsmain";
import ImportantInfo from "./Pages/mportant-info";
import DepositImportant from "./Pages/deposits-important-information";
import Accounts from "./Pages/accounts";
import Savings from "./Pages/savings";
import MetalAccount from "./Pages/metal-accounts";
import NonResident from "./Pages/non-resident";
import Security from "./Pages/security";
import Transfers from "./Pages/transfers";
import TransferPaymment from "./Pages/transfer-payment-systems";
function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>=
          <Route path="/" element={<Main />} />
          <Route path="/business-loans" element={<Busines />} />
          <Route path="/credit-history" element={<CreditLoans />} />
          <Route path="/security" element={<Security />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/transfer-payment-systems" element={<TransferPaymment />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/non-resident" element={<NonResident />} />
          <Route path="/metal-accounts" element={<MetalAccount />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/deposits-important-information" element={<DepositImportant />} />
          <Route path="/depositsmain" element={<DepositMain />} />
          <Route path="/mportant-info" element={<ImportantInfo />} />
          <Route path="/criteria" element={<Criteria />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/legal-loans" element={<LegalLoans />} />
          <Route path="/individual-loans" element={<IndividualLoans />} />
          <Route path="/tariffs" element={<Tariif />} />
          <Route path="/ombudsman" element={<Ombudsman />} />
          <Route path="/regulation" element={<Regulation />} />
          <Route path="/cardholders" element={<Cardholders />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/investors" element={<InvestReports />} />
          <Route path="/semiannual-report" element={<SemReports />} />
          <Route path="/builders" element={<Bulders />} />
           <Route path="/dealers" element={<Dealers />} />
          <Route path="/property" element={<Property />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/annual-report" element={<AnualReports />} />
          <Route path="/laws" element={<Laws />} />
          <Route path="/instant-payments" element={<Instant />} />
          <Route path="/financial-reports" element={<FinReports />} />
          <Route path="blog" element={<Blog />} />
          <Route path="bridge" element={<Bridge />} />
          <Route path="reports" element={<Reports />} />
          <Route path="internship" element={<Intership />} />
          <Route path="evocawork" element={<EvocaWork />} />
          <Route path="evokawork2" element={<Work2 />} /> 
          <Route path="answers" element={<Answer />} /> 
          <Route path="plus" element={<Plus/>} />
          <Route path="/management" element={<Managment/>} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/shareholders" element={<Sarheholder />} />
          <Route path="/evoca-group" element={<Group />} />
          <Route path="/about" element={<About/>} />
          <Route path="/csr" element={<Csr/>} />
          <Route path="/departments" element={<Departments/>} />
          <Route path="/partners" element={<Parthner/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/career" element={<Career/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
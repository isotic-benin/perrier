/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/PERO/Documents/fortune/pero/commerce/src';

const iconMap = {
    ChevronRight: 'FaChevronRight',
    ChevronLeft: 'FaChevronLeft',
    ChevronDown: 'FaChevronDown',
    Menu: 'FaBars',
    Search: 'FaMagnifyingGlass',
    ShoppingCart: 'FaCartShopping',
    User: 'FaUser',
    X: 'FaXmark',
    Globe: 'FaGlobe',
    Mail: 'FaEnvelope',
    MapPin: 'FaLocationDot',
    MessageCircle: 'FaMessage',
    Phone: 'FaPhone',
    Loader2: 'FaSpinner',
    CheckCircle: 'FaCircleCheck',
    CheckCircle2: 'FaCircleCheck',
    LogOut: 'FaArrowRightFromBracket',
    Minus: 'FaMinus',
    Plus: 'FaPlus',
    Star: 'FaStar',
    Heart: 'FaHeart',
    SlidersHorizontal: 'FaSliders',
    ArrowRight: 'FaArrowRight',
    ArrowLeft: 'FaArrowLeft',
    Trash2: 'FaTrashCan',
    ShoppingBag: 'FaBagShopping',
    ShieldCheck: 'FaShieldHalved',
    Truck: 'FaTruck',
    Users: 'FaUserGroup',
    CreditCard: 'FaCreditCard',
    Landmark: 'FaBuildingColumns',
    TreePine: 'FaTree',
    Check: 'FaCheck',
    Pencil: 'FaPenToSquare',
    ShieldOff: 'FaShield',
    Circle: 'FaRegCircle',
    Package: 'FaBox',
    Upload: 'FaUpload',
    XCircle: 'FaCircleXmark',
    RefreshCcw: 'FaArrowsRotate',
    Home: 'FaHouse'
};

function readAllKeys() {
    const missing = new Set();

    function traverseDirs(currentDir) {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                traverseDirs(fullPath);
            } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
                let content = fs.readFileSync(fullPath, 'utf8');

                // Find import { ... } from "lucide-react"
                const regex = /import\s+{(.*?)}\s+from\s+["']lucide-react["'];?/s;
                const match = content.match(regex);
                if (match) {
                    const importsStr = match[1];
                    const icons = importsStr.split(',').map(s => s.trim()).filter(Boolean);

                    let newImports = [];

                    icons.forEach(lucideIcon => {
                        const reactIcon = iconMap[lucideIcon];
                        if (!reactIcon) {
                            console.log(`Missing mapping for: ${lucideIcon} in ${fullPath}`);
                            missing.add(lucideIcon);
                            newImports.push('FaCircle'); // Fallback
                        } else {
                            newImports.push(reactIcon);
                        }

                        // Replace JSX tags <LucideIcon to <ReactIcon
                        const tagRegex1 = new RegExp(`<${lucideIcon}(\\s|>)`, 'g');
                        content = content.replace(tagRegex1, `<${reactIcon || 'FaCircle'}$1`);

                        const tagRegex2 = new RegExp(`</${lucideIcon}>`, 'g');
                        content = content.replace(tagRegex2, `</${reactIcon || 'FaCircle'}>`);
                    });

                    // Replace the whole import block with react-icons/fa6
                    const newImportSyntax = `import { ${[...new Set(newImports)].join(', ')} } from "react-icons/fa6";${newImports.includes('FaSpinner') ? '\nimport "@/lib/spinner.css"; // Add potential custom rotate if needed' : ''
                        }`;

                    content = content.replace(regex, newImportSyntax);

                    // FaSpinner from FA does not spin by default. Let's add className="animate-spin" dynamically if we used `<Loader2`
                    // Actually, FaSpinner doesn't spin automatically, we usually add className="animate-spin".
                    // If we see <FaSpinner, we ensure animate-spin is somewhere. (Assuming lucide-react Loader2 had it).

                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Migrated: ${fullPath}`);
                }
            }
        }
    }

    traverseDirs(dir);
    console.log("Missing mappings:", Array.from(missing));
}

readAllKeys();
